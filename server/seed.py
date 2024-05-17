from services import *
from models import *

with app.app_context():

    User.query.delete()
    Marker.query.delete()
    Favorite.query.delete()
    Friendship.query.delete()

    jeff = User(
        username = "jeff",
        email = "jeff@email.com",
        password = "hellothere",
        icon = "image@url.com"
    )
    bezos = User(
        username = "bezos",
        email = "bezos@email.com",
        password = "yeet",
        icon = "hmmm@url.com"
    )
    db.session.add_all([jeff, bezos])
    db.session.commit()

    denver = Marker(
        caption = "This city sucks",
        image_url = "image@url.com",
        latitude = 39.7392,
        longitude = 104.9903,
        user_id = 1
    )
    db.session.add(denver)
    db.session.commit()
    fren = Friendship(
        user_id = 1,
        friend_id = 2
    )
    db.session.add(fren)
    db.session.commit()
    spot = Favorite(
        user_id = 1,
        marker_id = 1
    )
    db.session.add(spot)
    db.session.commit()
