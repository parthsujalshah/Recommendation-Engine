from flask import Flask, jsonify
from generators import dataset_generator, generate_svd_model
import pandas as pd
import numpy as np
from surprise import SVD, Reader, Dataset, accuracy
from sklearn.metrics.pairwise import cosine_similarity
import pickle

# dataset_generator.generate_data()
# generate_svd_model.generate_svd_model()

app = Flask(__name__)

@app.route('/')
def main():
    return jsonify({'message': 'hello world'})

@app.route('/reader_ids')
def reader_ids():
    df = pd.read_csv('data.csv')
    return jsonify({
        'reader_ids': list(df['reader_id'])[:50]
    })

@app.route('/book_ids')
def book_ids():
    df = pd.read_csv('data.csv')
    return jsonify({
        'book_ids': list(df['book_id'])[:50]
    })

@app.route('/predict/<int:reader_id>/<int:book_id>')
def predict(reader_id, book_id):
    n_recs = 50
    svd = SVD()
    pickle_model = 'model.p'

    df = pd.read_csv('data.csv')

    rmat = df.pivot_table(columns='book_id', index='reader_id', values='book_rating').fillna(0)

    cosine_sim = cosine_similarity(rmat, rmat)
    cosine_sim = pd.DataFrame(cosine_sim, index=rmat.index, columns=rmat.index)

    # collaborative filtering
    reader = Reader()
    data = Dataset.load_from_df(df[['reader_id', 'book_id', 'book_rating']], reader)

    # run the trained model against the testset
    loaded_model = None
    with open(pickle_model, 'rb') as file:
        loaded_model = pickle.load(file)

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
    return jsonify({
        'recommended_books': list(df['book_id'])
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000)