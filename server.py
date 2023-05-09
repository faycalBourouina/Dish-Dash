"""Server for Dish-Dash app"""
from flask import (Flask, request)
from urllib.parse import parse_qs

import crud


app = Flask(__name__)


@app.route("/")
def index():
    """Return trending and custom recipes"""
    
    return "Trending"

@app.route("/session", methods=["POST"])
def session():
    """Return session"""

    return "Session"

@app.route("/search")
def get_search_recipes():
    """Search for recipes"""

    search_dict = request.args.to_dict()
    crud.search_recipes(search_dict)

    return "Search"

@app.route("/recipes/<recipe_id>")
def recipe_details(recipe_id):
    """Return recipe"""

    return "Recipe"           


@app.route("/recipes/<recipe_id>/ingredients")
def recipe_ingredients(recipe_id):
    """Return recipe ingredients"""

    return "Recipe Ingredients"

@app.route("/users/<user_id>/favorites")
def user_favorites(user_id):
    """Return user favorites"""

    return "User Favorites"

@app.route("/users/<user_id>/favorites/<recipe_id>", methods=["PATCH"])
def add_favorite(user_id, recipe_id):
    """Add favorite"""

    return "Add Favorite"

@app.route("/users/<user_id>/favorites/<recipe_id>", methods=["DELETE"])
def delete_favorite(user_id, recipe_id):
    """Delete favorite"""

    return "Delete Favorite"

if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True)
