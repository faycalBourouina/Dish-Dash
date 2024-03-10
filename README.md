# Dish-Dash

A web application generates recipe ideas based on a user's specified ingredients and dietary preferences, while also providing links to purchase the necessary ingredients from Walmart. Users can easily find the perfect recipe for their needs with additional filters for ingredients to include, diet, cuisine, meal type, intolerances, and ready time. The application also provides users with the ability to save recipes as favorites for easy access and management.

## Demo Video

[![Watch the video](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3FjY2Z4NG8xZW9pMjhoZDV2NTdqNDc5ZXRoNGNybmd4ZHI2Ym9payZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/i4cQbhnJc1bMCtIdcd/giphy.gif)](https://www.youtube.com/watch?v=z0iRKaDXXA4)


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

### Wireframe

[Link to Wireframe](https://wireframe.cc/usWCFG)


## How to Run

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/faycalBourouina/Dish-Dash.git
    ```

2. **Navigate and Initialize**:

    Navigate to the project's server directory and initialize a virtual environment.

    ```bash
    cd Dish-Dash/server
    virtualenv env
    source env/bin/activate
    ```

3. **Install Dependencies**:

    While in the virtual environment, install all required dependencies.

    ```bash
    pip3 install -r requirements.txt
    ```

4. **Create a .env File**:

    ```bash
    touch .env
    ```

5. **Add API Secret Keys**:

    Add the following API secret keys to your `.env` file:

    ```bash
    echo 'SPOONACULAR_API_KEY=[insert_a_random_key_here]' >> .env
    echo 'BLUECART_API_KEY=[insert_a_random_key_here]' >> .env
    ```

6. **Add a Session Secret Key**:

    ```bash
    echo 'SESSION_SECRET_KEY=[insert_a_random_key_here]' >> .env
    ```

7. **Add Mode (Defaulted to Test Mode)**:

    ```bash
    echo 'MODE=TEST_MODE' >> .env
    ```

8. **Verify .env Keys**:

    Verify that all the .env keys were added successfully:

    ```bash
    cat .env
    ```

    You should see the `SPOONACULAR_API_KEY`, `BLUECART_API_KEY`, `SESSION_SECRET_KEY`, and `MODE` entries in the output.

9. **Create and Seed the Database**:

    Ensure PostgreSQL is installed. Then, run:

    ```bash
    python3 seed.py
    ```

    `seed.py` will create a database named `dish-dash`.

    You can verify the different tables and their content:

    ```bash
    psql dish-dash
    dish-dash=# \dt
    ```

    This will list the relations in the database.

10. **Start the Server**:

    Run the server:

    ```bash
    python3 server.py
    ```

    The server should be running at [http://localhost:5000/](http://localhost:5000/).
    

## Testing

This project includes a suite of unit tests to ensure the functionality of different components. These tests are implemented using the `unittest` framework and cover various aspects of the application. To run the tests, follow these steps:

1. **Navigate to the Test Directory**:

   ```bash
   cd Dish-Dash/server
   ```

2. **Run the tests**:

   ```bash
   python3 tests.py
   ```

   
## Technologies Used

### Backend

- Flask
- Flask-SQLAlchemy
- PostgreSQL
- Jinja2

### APIs

- Spoonacular
- Blue Cart

### Frontend

- React
- MUI

## Data Model

This section outlines the underlying database structure of the project. It provides insight into the tables used and their relationships.

### Table: users

- **Description**: Stores information about registered users.
- **Fields**:
  - *id* (Primary Key): Unique identifier for each user.
  - *email*: User's email address.
  - *password*: User's encrypted password.
  - *tags*: List of personalized food tags associated with the user.
  - *created_at*: Timestamp indicating when the user account was created.

### Table: favorites

- **Description**: Tracks the favorite recipes of each user.
- **Fields**:
  - *id* (Primary Key): Unique identifier for each favorite.
  - *user_id* (Foreign Key): References the id in the users table to associate the favorite with a specific user.
  - *recipe_id* (Foreign Key): References the id in the recipes table to indicate the favored recipe.

### Table: recipes

- **Description**: Contains details about different recipes.
- **Fields**:
  - *id* (Primary Key): Unique identifier for each recipe.
  - *title*: Name of the recipe.
  - *image*: Link to an image representing the recipe.
  - *ingredients*: List of ingredients required for the recipe.
  - *instructions*: Step-by-step instructions to prepare the recipe.
  - *kiss*: An indicator of recipe popularity or rating.
  - *created_at*: Timestamp indicating when the recipe was added.

### Table: ingredients

- **Description**: Stores information about individual ingredients.
- **Fields**:
  - *id* (Primary Key): Unique identifier for each ingredient.
  - *name*: Name of the ingredient.
  - *calories*: Caloric content of the ingredient.
  - *icon*: Link to an icon representing the ingredient.

### Table: ingredientsrecipes

- **Description**: Represents the relationship between ingredients and recipes, indicating which ingredients are used in which recipes.
- **Fields**:
  - *ingredientsrecipes_id* (Primary Key): Unique identifier for each entry.
  - *ingredient_id* (Foreign Key): References the id in the ingredients table to link an ingredient.
  - *recipe_id* (Foreign Key): References the id in the recipes table to link a recipe.

### Table: walmartitems

- **Description**: Contains information about items available for purchase on Walmart related to recipe ingredients.
- **Fields**:
  - *id* (Primary Key): Unique identifier for each item.
  - *link*: Link to the Walmart product page.
  - *price*: Price of the item.
  - *description*: Description of the item.
  - *imguri*: Link to an image representing the item.

#### Data Model Diagram

[Link to Data Model Diagram](https://dbdiagram.io/embed/64547e77dca9fb07c48b0940)


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


## Acknowledgements:

This project represents the highlight of my journey at Hackbright Academy, thanks in large part to Walmart's generous support. A big thank you to Hackbright Academy for providing me with the tools and guidance to bring this project to life.

A special shoutout to the mentors and fellow students at Hackbright Academy for their help throughout this exciting journey.
