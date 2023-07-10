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

Link: https://dbdiagram.io/d/64547e77dca9fb07c48b0940

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
