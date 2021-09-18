# HYBRID RECOMMENDER

### Purpose
The purpose of this application is to recommend books for its users. The suggestion is based on 2 things:
    1. Choice of the user (based on the book ratings)
    2. The book selected by the user (for similar recommendations)

## Using the application:
- The user fills a reader name and clicks on submit button. In this case, there are 3 reader names which are linked to the dataset: "r1", "r2", and "r3". To get the results, please fill one of these reader names.
- The user is redirected to a page where there is a list of options of all the books available
- User will select a book on the basis of which he/she wants similar recommendations
- The user will get 9 similar books recommendations.
Note: Rather than book names, there are book ids.

### Dataset
A csv file for the dataset has been generated using python. The dataset will be used for applications of recommendation systems.
- Dataset columns:
    - Book id
    - Author id
    - Book genre
    - Reader id
    - Number of pages
    - Book ratings
    - Publisher id
    - Published year
    - Book price
    - Text Language
    - Book Image
- Parameters used for dataset generation:
    - Number of books
    - Number of genres
    - Number of authors
    - Number of publishers
    - Number of readers
    - Dataset size

### Model Generation
SVD is being used and a pickle file is generated 

### Getting Recommendations using a hybrid system
- Approaches user:
    - Collaborative Filtering: Collaborative filtering is the process of predicting the interests of a user by identifying preferences and information from many users.  The underlying intuition behind collaborative filtering is that if user A and B have similar taste in a product, then A and B are likely to have similar taste in other products as well.
    - Content Based Systems: Content based systems generates recommendations based on the users preferences and profile. They try to match users to items which they’ve liked previously.
- Working:
    - The selected book id will be used in a content-based model (cosine similarity) to compute 50 most similar books
    - The reader id will be used to predict the ratings the user might give to these 50 books using a collaborative filtering model (SVD)
    - Return the top 9 books with the highest predicted rating

### Running the application locally
- Install python and node
- Clone the repo
- Go to the project root dir
- For python:
```bash
pip install -r requirements.txt
python app.py
```
- For node:
```bash
cd frontend/
npm install
npm start
```
### Generating new Dataset
- Go to the root folder and run:
```bash
python generators/dataset_generator.py
python generators/generate_svd_model.py
```