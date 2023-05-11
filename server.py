"""Server for Dish-Dash app"""
from flask import (Flask, request, session)
from flask_cors import CORS
from urllib.parse import parse_qs
import os
from dotenv import load_dotenv
import crud

app = Flask(__name__)
CORS(app)

# Load the API key from the .env file
load_dotenv()

app.secret_key = os.getenv("SESSION_SECRET_KEY")

@app.route("/")
def get_landing_page_recipes():
    """Return trending and custom recipes"""

    response = crud.get_landing_page_recipes()

    if response:
        return response, 200
    else:
        return "Error", 404

@app.route("/authenticate", methods=["POST"])
def authenticate_user():
    """Authenticate user"""

    password = request.form.get('password')
    email = request.form.get('email')
    print("credentials: ", password, email)

    response = crud.authenticate(email, password)

    if len(response) > 0:
        session['user'] = response
        return response, 200
    else:
        return 'Authentication failed', 401

@app.route("/search")
def search_recipes():
    """Search for recipes"""

    search_dict = request.args.to_dict()
    response = crud.search_recipes(search_dict)

    if response:
        return response, 200
    else:
        return "Error", 404

@app.route("/recipes/<recipe_id>")
def get_recipe(recipe_id):
    """Return recipe"""

    response = crud.get_recipe(recipe_id)

    if response:
        return response, 200
    else:   
        return "Error", 404

@app.route("/recipes/<recipe_id>/ingredients")
def get_recipe_ingredients(recipe_id):
    """Return recipe ingredients"""
    
    response = crud.get_recipe_ingredients(recipe_id)

    if response:
        return response, 200
    else:
        return "Error", 404
    
@app.route("/users/<int:user_id>/favorites")
def get_user_favorites(user_id):
    """Return user favorites"""

    print("session: ", session.get('user'))
    if 'user' in session and session['user']['id'] == user_id:
        return "Favorites recipes"
    else:
         return "Authentication required", 401

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