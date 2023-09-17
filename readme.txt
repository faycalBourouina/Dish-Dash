#Project Proposal

A web application generates recipe ideas based on a user's specified ingredients and dietary preferences, while also providing links to purchase the necessary ingredients from Walmart. Users can easily find the perfect recipe for their needs with additional filters for ingredients to include, diet, cuisine, meal type, intolerances, and ready time. The application also provides users with the ability to save recipes as favorites for easy access and management.

## Demo Video

http://www.youtube.com/watch?v=z0iRKaDXXA4

## Features

### Completed

- **Personalization:** Create an account and select food tags to personalize your experience
- **Security:** Secure login and authentication using a Flask session
- **Navigation:** Seamless navigation between screens (Home, My Recipes, Search, Account and Searching) with a single-page application (SPA) design
- **Search:** Robust recipe search functionality with natural language queries and filters for ingredients, diets, cuisines, meal type, intolerances, and ready time. Enhanced by autocomplete and suggestions
- **Recommendations:** Customized recipe recommendations on the home page based on user preferences, including trending recipes, custom recipes, and similar recipes
- **My Recipes:** Save and manage favorite recipes from different UIs with easy access through the My Recipes tab. Favorite recipes are displayed as favorites from any screen, whether search, landing or My Recipes tabs
- **Details:** Detailed information about each recipe is displayed when selected
- **Discovery:** Discover new ideas with similar recipes displayed below the selected recipe
- **Shopping:** Convenient links to purchase ingredients from Walmart on the same screen as the selected recipe. Displays Walmart item details such as price, review rating and other tags like free shipping and best seller
- **Management:** Add or remove a recipe from any screen displaying the recipe by simply clicking the heart button
- **Validation:** Form validation and error messages display provide feedback and prevent invalid inputs
- **Feedback:** Action feedback helps users understand the result of their actions
- **Caching:** Recipes are cached in the front-end to minimize server requests and improve user experience
- **Loading:** When recipes or Walmart items are loading, the UI displays a similar UI with MUI skeletons

### Technologies Used

#### Backend

- Flask
- Flask-SQLAlchemy
- PostgreSQL
- Jinja2

#### APIs

- Spoonacular
- Blue Cart

#### Frontend

- React
- MUI

## Data Model

This section outlines the underlying database structure of the project. It provides insight into the tables used and their relationships.

Table: users

Description: Stores information about registered users.
Fields:
id (Primary Key): Unique identifier for each user.
email: User's email address.
password: User's encrypted password.
tags: List of personalized food tags associated with the user.
created_at: Timestamp indicating when the user account was created.

Table: favorites

Description: Tracks the favorite recipes of each user.
Fields:
id (Primary Key): Unique identifier for each favorite.
user_id (Foreign Key): References the id in the users table to associate the favorite with a specific user.
recipe_id (Foreign Key): References the id in the recipes table to indicate the favored recipe.

Table: recipes

Description: Contains details about different recipes.
Fields:
id (Primary Key): Unique identifier for each recipe.
title: Name of the recipe.
image: Link to an image representing the recipe.
ingredients: List of ingredients required for the recipe.
instructions: Step-by-step instructions to prepare the recipe.
kiss: An indicator of recipe popularity or rating.
created_at: Timestamp indicating when the recipe was added.

Table: ingredients

Description: Stores information about individual ingredients.
Fields:
id (Primary Key): Unique identifier for each ingredient.
name: Name of the ingredient.
calories: Caloric content of the ingredient.
icon: Link to an icon representing the ingredient.

Table: ingredientsrecipes

Description: Represents the relationship between ingredients and recipes, indicating which ingredients are used in which recipes.
Fields:
ingredientsrecipes_id (Primary Key): Unique identifier for each entry.
ingredient_id (Foreign Key): References the id in the ingredients table to link an ingredient.
recipe_id (Foreign Key): References the id in the recipes table to link a recipe.

Table: walmartitems

Description: Contains information about items available for purchase on Walmart related to recipe ingredients.
Fields:
id (Primary Key): Unique identifier for each item.
link: Link to the Walmart product page.
price: Price of the item.
description: Description of the item.
imguri: Link to an image representing the item.


#### Data Model Diagram

<iframe width="100%" height="500" src="https://dbdiagram.io/embed/64547e77dca9fb07c48b0940"></iframe>

## Roadmap

### MVP

1. Search for recipes and filter results
2. Save recipes as favorites
3. Match recipe ingredients with Walmart items

### 2.0

1. Implementing React components for the front-end
2. Adding user tags during signup to personalize recipe recommendations
3. Implementing a refined custom recipe recommendation algorithm
4. Adding the Grid system to improve the front-end layout
5. Styling

### Nice-to-haves

1. Social media login and JWT
2. Implementing a newsletter subscription
3. Improve the landing page algorithm and categorize the returned recipes
4. Improve searching

## Notes

The wireframe of the project: https://wireframe.cc/usWCFG.
