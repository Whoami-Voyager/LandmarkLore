from services import *

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password = db.Column(db.String)
    icon = db.Column(db.String)

    friends = db.relationship("Favorite", back_populates = "users", cascade = "all, delete")
    markers = db.relationship("Marker", back_populates = "user", cascade = "all, delete")

class Marker(db.Model, SerializerMixin):
    __tablename__ = "markers"

    id = db.Column(db.Integer, primary_key = True)
    caption = db.Column(db.String)
    image_url = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    username = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates = "markers")

class Friend(db.Model, SerializerMixin):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key = True)
    user_id1 = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_id2 = db.Column(db.Integer, db.ForeignKey("users.id"))

    users = db.relationship("User", back_populates = "friends")

class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    marker_id = db.Column(db.Integer, db.ForeignKey("markers.id"))