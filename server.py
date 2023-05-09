"""Server for Dish-Dash app"""
import requests
from flask import Flask
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")


if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True)
