from itertools import combinations


def sqlalchemy_obj_to_dict(obj):
    """Convert a SQLAlchemy object to a dictionary."""

    obj_dict = {}
    for column in obj.__table__.columns:
        obj_dict[column.name] = getattr(obj, column.name)
        
    return obj_dict


def is_valid_upc(upc):
    """Check if UPC is valid"""
    
    # Example validation logic
    if len(upc) == 12 and upc.isdigit():
        return True
    else:
        return False

def get_groceries_upcs(groceries):
    """Get groceries upcs"""

    # Get groceries items from recipe ingredients
    #groceries = map_ingredients_groceries(recipe_id)
    products = {}

    if groceries:
        for item in groceries:
            for product in item["products"]:
                upc = product["upc"]
                if is_valid_upc(upc):
                    original_name = item["originalName"]
                    if original_name not in products:
                        products[original_name] = []
                    products[original_name].append(upc)
    return products

def get_tag_combinations_of_2(tags):
    """Return all possible combinations of 2 tags"""
    return list(combinations(tags, 2))


def remove_duplicate_recipes(recipes):
    """Remove duplicates from a list of recipes based on recipe ID"""
    unique_ids = set()
    filtered_recipes = []
    for recipe in recipes:
        recipe_id = recipe['id']
        if recipe_id not in unique_ids:
            unique_ids.add(recipe_id)
            filtered_recipes.append(recipe)
    return filtered_recipes


def mimic_api_autocomplete(query, recipes_obj):
    """Mimic api autocomplete for testing mode"""

    results = []
    for obj in recipes_obj:
        if obj['name'].startswith(query):
            results.append(obj['name'])
    return results