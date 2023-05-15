""" Models for the database """

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """ User of the app """

    __tablename__ = 'users'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    favorites = db.relationship('Favorite', back_populates='user')

    def __repr__(self):
        return f'<User id={self.id} email={self.email}>'
    

class Recipe(db.Model):
    """ Recipe """

    __tablename__ = 'recipes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)
    kisses = db.Column(db.Integer , default=1)



    favorites = db.relationship('Favorite', back_populates='recipe')
    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='recipe')

    def __repr__(self):
        return f'<Recipe id={self.id} title={self.title}>'
    
class Favorite(db.Model):
    """ Favorite """

    __tablename__ = 'favorites'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    user = db.relationship('User', back_populates='favorites')
    recipe = db.relationship('Recipe', back_populates='favorites')

    def __repr__(self):
        return f'<Favorite favorite_id={self.id} kisses={self.kisses} user_id={self.user_id} recipe_id={self.recipe_id}>'
    


class Ingredient(db.Model):
    """ Ingredient """

    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, unique=True)

    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='ingredient')

    def __repr__(self):
        return f'<Ingredient id={self.id} name={self.name}>'
    


class RecipeIngredient(db.Model):
    """ Recipe Ingredient """

    __tablename__ = 'recipe_ingredients'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    recipe = db.relationship('Recipe', back_populates='recipe_ingredients')
    ingredient = db.relationship('Ingredient', back_populates='recipe_ingredients')

    def __repr__(self):
        return f'<RecipeIngredient id={self.id} recipe_id={self.recipe_id} ingredient_id={self.ingredient_id}>'




# Connects to dish-dash database
def connect_to_db(flask_app, db_uri='postgresql:///dish-dash', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    