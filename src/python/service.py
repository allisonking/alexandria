# -*- coding: utf-8 -*-
import json
import os

import requests
import xmltodict

VERSION = 2
API_URL = "https://www.goodreads.com/review/list"
SHELF = "read"

GOODREADS_API_KEY = os.getenv('GOODREADS_API_KEY')


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else res,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Content-Encoding, Accept-Encoding'
        },
    }


def handler(event, context):
    user_id = event['queryStringParameters']['user_id']
    read_books = get_read_books(user_id)
    response = json.dumps(read_books)

    return respond(None, response)


def get_read_books(user_id):
    try:
        response = _make_goodreads_request(user_id)
        wrapped = xmltodict.parse(response.text)

        reviews = wrapped["GoodreadsResponse"]["reviews"]["review"]
        """
        book
            - cover image
            x genre
            can try to get genre by https://www.goodreads.com/topic/show/19317219-getting-the-genre-of-a-book
            getting the most common shelf the book has been placed on by users
            - author
            - rating
            - date read
            - publication date
            -title
        """

        book_data = []
        if not isinstance(reviews, list):
            # handle case where only one book on shelf
            return []
        else:
            for review in reviews:
                try:
                    user_rating = review['rating']
                    if user_rating == "0":
                        user_rating = None
                    date_read = review['read_at']
                    book = review["book"]
                    title = book["title"]
                    author = book["authors"]['author']['name']
                    image_url = book['image_url']
                    small_image_url = book['small_image_url']
                    publication_year = book['publication_year']
                    book_datum = {
                        "date_read": date_read,
                        "user_rating": user_rating,
                        "title": title,
                        "author": author,
                        "image_url": image_url,
                        "small_image_url": small_image_url,
                        "publication_year": publication_year,
                    }
                    book_data.append(book_datum)
                except KeyError as parse_error:
                    print(parse_error)
                    continue

    except requests.exceptions.RequestException as e:
        print(e)
        return []

    return book_data


def _make_goodreads_request(user_id) -> requests.Response:
    params = {
        "v": VERSION,
        "shelf": SHELF,
        "id": user_id,
        "key": GOODREADS_API_KEY,
        "per_page": 200,
        "sort": "date_added"
    }

    response = requests.get(API_URL, params)
    return response

