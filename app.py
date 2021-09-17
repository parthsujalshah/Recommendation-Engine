from flask import Flask, jsonify
from generators import dataset_generator, generate_svd_model
import pandas as pd
import numpy as np
from surprise import SVD, Reader, Dataset, accuracy
from sklearn.metrics.pairwise import cosine_similarity
import pickle
from flask_cors import CORS
import random
from generators.dataset_generator import image_list

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return jsonify({'message': 'hello world'})

@app.route('/reader_ids')
def reader_ids():
    df = pd.read_csv('data.csv')
    return jsonify({
        'reader_ids': list(df['reader_id'])[:50]
    })

@app.route('/books')
def book_ids():
    df = pd.read_csv('data.csv')
    ret_list = []
    n = 50
    for i in range(n):
        ret_list.append({
            'id': int(df['book_id'][i]),
            'description': "Laborum commodo dolore in culpa adipisicing ad eu dolore consequat minim aliqua anim. Duis nulla commodo ea sit. Adipisicing non elit et excepteur tempor commodo ea laboris enim sit proident excepteur.",
            'image': str(image_list[df['image'][i]])
        })
    return jsonify({
        'books': ret_list
    })

@app.route('/predict/<reader_name>/<int:book_id>')
def predict(reader_name, book_id):
    reader_id = None
    if reader_name == 'r1':
        reader_id = 278
    elif reader_name == 'r2':
        reader_id = 280
    else:
        reader_id = 864
    
    n_recs = 9
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
    books = df.iloc[book_idx][['book_id', 'book_rating', 'num_pages', 'publish_year', 'book_price', 'reader_id', 'image']]

    # predict using the svd
    books['est'] = books.apply(lambda x: loaded_model.predict(reader_id, x['book_id'], x['book_rating']).est, axis = 1)

    # sort predictions in decreasing order and return top n_recs
    books = books.sort_values('est', ascending=False)
    ret_list = []
    for i in range(n_recs):
        ret_list.append({
            'id': list(books.head(n_recs)['book_id'])[i],
            'image': image_list[list(books.head(n_recs)['image'])[i]],
            'description': "Laborum commodo dolore in culpa adipisicing ad eu dolore consequat minim aliqua anim. Duis nulla commodo ea sit. Adipisicing non elit et excepteur tempor commodo ea laboris enim sit proident excepteur.",
        })

    return jsonify({
        'recommended_books': ret_list
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000)