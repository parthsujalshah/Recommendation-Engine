import pandas as pd
from random import randint

image_list = [
    'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
    'https://binaries.templates.cdn.office.net/support/templates/en-us/lt22301254_quantized.png',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105',
]

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
        'text_lang' : [randint(1,7) for _ in range(dataset_size)],
        'image': [randint(0, len(image_list) - 1) for _ in range(dataset_size)]
    }).drop_duplicates()
    d.to_csv('data.csv', index = False)

generate_data()