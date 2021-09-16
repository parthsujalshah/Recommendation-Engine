import pandas as pd
from random import randint

def generate_data(n_books=3000, n_genres=10, n_authors=450, n_publishers=50, n_readers = 3000, dataset_size = 100000):
    d = pd.DataFrame({
        'book_id' : [randint(1, n_books) for _ in range(dataset_size)],
        'author_id' : [randint(1, n_authors) for _ in range(dataset_size)],
        'book_genre' : [randint(1, n_genres) for _ in range(dataset_size)],
        'reader_id' : [randint(1, n_readers) for _ in range(dataset_size)],
        'num_pages' : [randint(75, 700) for _ in range(dataset_size)],
        'book_rating' : [randint(1, 10) for _ in range(dataset_size)],
        'publisher_id' : [randint(1, n_publishers) for _ in range(dataset_size)],
        'publish_year' : [randint(2000, 2021) for _ in range(dataset_size)],
        'book_price' : [randint(1, 200) for _ in range(dataset_size)],
        'text_lang' : [randint(1,7) for _ in range(dataset_size)]
    }).drop_duplicates()
    d.to_csv('data.csv', index = False)