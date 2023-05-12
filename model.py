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

    favorites = db.relationship('Favorite')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'
    

class Recipe(db.Model):
    """ Recipe """

    __tablename__ = 'recipes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)

    favorites = db.relationship('Favorite')
    def __repr__(self):
        return f'<Recipe recipe_id={self.recipe_id} title={self.title}>'
    
class Favorite(db.Model):
    """ Favorite """

    __tablename__ = 'favorites'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    likes = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    user = db.relationship('User')
    recipe = db.relationship('Recipe')

    def __repr__(self):
        return f'<Favorite favorite_id={self.favorite_id} user_id={self.user_id} recipe_id={self.recipe_id}>'
    
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
    