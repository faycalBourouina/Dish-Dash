def sqlalchemy_obj_to_dict(obj):
    """Convert a SQLAlchemy object to a dictionary."""
    obj_dict = {}
    for column in obj.__table__.columns:
        obj_dict[column.name] = getattr(obj, column.name)
    return obj_dict