import requests
from dotenv import load_dotenv
import os

load_dotenv()
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")


uri_recipes = f'https://api.spoonacular.com/recipes'

def search_recipes(search):
    """Search for recipes"""

    query = search.get('query', '')
    diet = search.get('diet', '')
    cuisine = search.get('cuisine', '')
    #intolerances = search.get('intolerances', '')
    #includeIngredients = search.get('includeIngredients', '')
    #type = search.get('type', '')
    #maReadyTime = search.get('maxReadyTime', '')
    #fillIngredients	= True

    request = f'{uri_recipes}/complexSearch?&query={query}&diet={diet}&cuisine={cuisine}&apiKey={SPOONACULAR_API_KEY}'

    #response = requests.get(request).json()




