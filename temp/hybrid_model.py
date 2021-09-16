import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from surprise import SVD, Reader, Dataset, accuracy
from surprise.model_selection import train_test_split
import pickle

def hybrid(reader_id=234, book_id=203, n_recs=50):
    df = pd.read_csv('data.csv')

    rmat = df.pivot_table(columns='book_id', index='reader_id', values='book_rating').fillna(0)

    cosine_sim = cosine_similarity(rmat, rmat)
    cosine_sim = pd.DataFrame(cosine_sim, index=rmat.index, columns=rmat.index)

    # collaborative filtering
    reader = Reader()
    data = Dataset.load_from_df(df[['reader_id', 'book_id', 'book_rating']], reader)

    # split the data
    trainset, testset = train_test_split(data, test_size=0.3,random_state=10)

    # train
    svd = SVD()
    svd.fit(trainset)
    pickle_model = 'model.p'
    pickle.dump(svd, open(pickle_model, 'wb'))

    # run the trained model against the testset
    loaded_model = None
    with open(pickle_model, 'rb') as file:
        loaded_model = pickle.load(file)

    test_pred = loaded_model.test(testset)

    # get RMSE
    accuracy.rmse(test_pred, verbose=True)
    # sort similarity values in decreasing order and take top 50 results
    sim = list(enumerate(cosine_sim[int(book_id)]))
    sim = sorted(sim, key=lambda x: x[1], reverse=True)
    sim = sim[1:50]

    # get book metadata
    book_idx = [i[0] for i in sim]
    books = df.iloc[book_idx][['book_id', 'book_rating', 'num_pages', 'publish_year', 'book_price', 'reader_id']]

    # predict using the svd
    books['est'] = books.apply(lambda x: loaded_model.predict(reader_id, x['book_id'], x['book_rating']).est, axis = 1)

    # sort predictions in decreasing order and return top n_recs
    books = books.sort_values('est', ascending=False)
    return books.head(n_recs)

print(hybrid())