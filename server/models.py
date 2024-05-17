from services import *

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password = db.Column(db.String)
    icon = db.Column(db.String)

    markers = db.relationship("Marker", back_populates="user", cascade="all, delete")
    favorites = db.relationship("Favorite", back_populates="user", cascade="all, delete")
    friends = db.relationship("User", secondary="friendships", primaryjoin="User.id == Friendship.user_id", secondaryjoin="User.id == Friendship.friend_id", backref="friend_of")

    serialize_rules = ("-_password", "-markers.user", "-favorites.user", "-friends.friend_of")

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, word):
        password_encrypt = bcrypt.generate_password_hash(word.encode('utf-8'))
        self._password = password_encrypt.decode('utf-8')

    def check_password(self, word):
        return bcrypt.check_password_hash(self._password, word.encode('utf-8'))


class Marker(db.Model, SerializerMixin):
    __tablename__ = "markers"

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String)
    image_url = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="markers")
    favorites = db.relationship("Favorite", back_populates="marker", cascade="all, delete-orphan")

    serialize_rules = ("-user.markers", "-favorites.marker")


class Friendship(db.Model, SerializerMixin):
    __tablename__ = "friendships"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    friend_id = db.Column(db.Integer, db.ForeignKey("users.id"))

class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    marker_id = db.Column(db.Integer, db.ForeignKey("markers.id"))

    user = db.relationship("User", back_populates="favorites")
    marker = db.relationship("Marker", back_populates="favorites")

    serialize_rules = ("-user.favorites", "-marker.favorites", "-user.markers", "-marker.user")
