import requests
from dotenv import load_dotenv
import os
import json


# Load the API key from the .env file
load_dotenv()
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

# The base uri for the spoonacular recipes API
uri_recipes = f'https://api.spoonacular.com/recipes'

# mock data for testing
with open('data/mock_api.json') as f:
    mock_data = json.load(f)

# Set to True to use mock data
TEST_MODE = True


def get_landing_page_recipes():
    """Return trending and custom recipes"""

    # Use mock data in test mode
    if TEST_MODE:
        response = mock_data['landing_page']['response']
    else:
        request = f'{uri_recipes}/random?number=10&apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

    return response

def search_recipes(search):
    """Search for recipes"""

    # Use mock data in test mode
    if TEST_MODE:
        response = mock_data['search']['response']
    else:

        query = search.get('query', '')
        diet = search.get('diet', '')
        cuisine = search.get('cuisine', '')
        intolerances = search.get('intolerances', '')
        includeIngredients = search.get('includeIngredients', '')
        type = search.get('type', '')
        maReadyTime = search.get('maxReadyTime', '')
        #fillIngredients	= True

        request = f'{uri_recipes}/complexSearch?&query={query}&diet={diet}&cuisine={cuisine}&apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

    return response



