from services import *
from models import *

with app.app_context():

    User.query.delete()
    Marker.query.delete()
    Favorite.query.delete()
    Friendship.query.delete()

    jeff = User(
        username = "Jeff",
        email = "jeff@email.com",
        password = "hellothere",
        icon = "image@url.com"
    )
    bezos = User(
        username = "Bezos",
        email = "bezos@email.com",
        password = "yeet",
        icon = "hmmm@url.com"
    )
    elon = User(
        username = "Elon",
        email = "elon@email.com",
        password = "hellothere",
        icon = "image@url.com"
    )
    musk = User(
        username = "Musk",
        email = "musk@email.com",
        password = "yeet",
        icon = "hmmm@url.com"
    )
    andrew = User(
        username = "Andrew",
        email = "andrew@email.com",
        password = "hellothere",
        icon = "image@url.com"
    )
    tristan = User(
        username = "Tristan",
        email = "tristan@email.com",
        password = "yeet",
        icon = "hmmm@url.com"
    )
    tate = User(
        username = "Tate",
        email = "tate@email.com",
        password = "hellothere",
        icon = "image@url.com"
    )
    mark = User(
        username = "Mark",
        email = "mark@email.com",
        password = "yeet",
        icon = "hmmm@url.com"
    )
    bill = User(
        username = "Bill",
        email = "bill@email.com",
        password = "hellothere",
        icon = "image@url.com"
    )
    gates = User(
        username = "Gates",
        email = "gates@email.com",
        password = "yeet",
        icon = "hmmm@url.com"
    )
    db.session.add_all([jeff, bezos, elon, musk, andrew, tristan, tate, mark, bill, gates])
    db.session.commit()

    denver = Marker(
        caption = "This city sucks",
        image_url = "image@url.com",
        latitude = 39.7392,
        longitude = -104.9903,
        user_id = 1
    )
    london = Marker(
        caption = "Got stabbed here",
        image_url = "image@url.com",
        latitude = 51.5074,
        longitude = -0.1278,
        user_id = 4
    )
    rome = Marker(
        caption = "Great Pizza",
        image_url = "image@url.com",
        latitude = 41.9028,
        longitude = 12.4964,
        user_id = 3
    )
    moscow = Marker(
        caption = "блять",
        image_url = "image@url.com",
        latitude = 55.7558,
        longitude = 37.6173,
        user_id = 4
    )
    sydney = Marker(
        caption = "ǝʇɐɯ ᴉO",
        image_url = "image@url.com",
        latitude = -33.8688,
        longitude = 151.2093,
        user_id = 9
    )
    vancouver = Marker(
        caption = "Opioid capital of Canada",
        image_url = "image@url.com",
        latitude = 49.2827,
        longitude = -123.1207,
        user_id = 6
    )
    dubai = Marker(
        caption = "What color is your Bugatti?",
        image_url = "image@url.com",
        latitude = 25.276987,
        longitude = 55.296249,
        user_id = 7
    )
    db.session.add_all([denver,london,rome,sydney,moscow,vancouver,dubai])
    db.session.commit()

    fren = Friendship(
        user_id = 3,
        friend_id = 6
    )
    fren1 = Friendship(
        user_id = 1,
        friend_id = 2
    )
    fren2 = Friendship(
        user_id = 4,
        friend_id = 9
    )
    fren3 = Friendship(
        user_id = 2,
        friend_id = 7
    )
    fren4 = Friendship(
        user_id = 5,
        friend_id = 4
    )
    db.session.add_all([fren, fren1, fren2, fren3, fren4])
    db.session.commit()
    
    spot = Favorite(
        user_id = 6,
        marker_id = 4
    )
    spot1 = Favorite(
        user_id = 9,
        marker_id = 4
    )
    spot2 = Favorite(
        user_id = 9,
        marker_id = 5
    )
    spot3 = Favorite(
        user_id = 5,
        marker_id = 4
    )
    spot4 = Favorite(
        user_id = 2,
        marker_id = 7
    )
    db.session.add_all([spot, spot1, spot2, spot3, spot4])
    db.session.commit()
