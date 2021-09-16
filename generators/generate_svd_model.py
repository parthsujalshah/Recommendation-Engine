import pickle
from surprise import SVD, Reader, Dataset
from surprise.model_selection import train_test_split
import pandas as pd


def generate_svd_model():
    df = pd.read_csv('data.csv')
    rmat = df.pivot_table(columns='book_id', index='reader_id', values='book_rating').fillna(0)
    reader = Reader()
    data = Dataset.load_from_df(df[['reader_id', 'book_id', 'book_rating']], reader)
    trainset, testset = train_test_split(data, test_size=0.3,random_state=10)

    svd = SVD()
    svd.fit(trainset)
    pickle_model = 'model.p'
    pickle.dump(svd, open(pickle_model, 'wb'))