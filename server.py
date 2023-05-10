"""Server for Dish-Dash app"""
from flask import (Flask, request)
from urllib.parse import parse_qs

import crud


app = Flask(__name__)


@app.route("/")
def get_landing_page_recipes():
    """Return trending and custom recipes"""

    response = crud.get_landing_page_recipes()

    return response


@app.route("/session", methods=["POST"])
def create_user_session():
    """Return session"""

    return "Session"

@app.route("/search")
def search_recipes():
    """Search for recipes"""

    search_dict = request.args.to_dict()
    response = crud.search_recipes(search_dict)

    return response

@app.route("/recipes/<recipe_id>")
def get_recipe(recipe_id):
    """Return recipe"""

    response = crud.get_recipe(recipe_id)

    return response         


@app.route("/recipes/<recipe_id>/ingredients")
def get_recipe_ingredients(recipe_id):
    """Return recipe ingredients"""

    return "Recipe Ingredients"

@app.route("/users/<user_id>/favorites")
def get_user_favorites(user_id):
    """Return user favorites"""

    return "User Favorites"

@app.route("/users/<user_id>/favorites/<recipe_id>", methods=["PATCH", "DELETE"])
def update_favorite(user_id, recipe_id):
    """Update favorite"""

    if request.method == "PATCH":
        # add favorite
        return "Add Favorite"
    elif request.method == "DELETE":
        # delete favorite
        return "Delete Favorite"

if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True)