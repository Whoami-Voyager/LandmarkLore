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
        image_url = "https://marvel-b1-cdn.bc0a.com/f00000000295839/red.msudenver.edu/wp-content/uploads/2022/02/denversummer_hero2_RED.jpg",
        latitude = 39.7392,
        longitude = -104.9903,
        user_id = 1
    )
    london = Marker(
        caption = "Got stabbed here",
        image_url = "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg",
        latitude = 51.5074,
        longitude = -0.1278,
        user_id = 4
    )
    rome = Marker(
        caption = "Great Pizza",
        image_url = "https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg",
        latitude = 41.9028,
        longitude = 12.4964,
        user_id = 3
    )
    moscow = Marker(
        caption = "блять",
        image_url = "https://www.nationsonline.org/gallery/Russia/State-Historical-Museum-Moscow.jpg",
        latitude = 55.7558,
        longitude = 37.6173,
        user_id = 4
    )
    sydney = Marker(
        caption = "ǝʇɐɯ ᴉO",
        image_url = "https://i.natgeofe.com/n/bd48279e-be5a-4f28-9551-5cb917c6766e/GettyImages-103455489cropped.jpg",
        latitude = -33.8688,
        longitude = 151.2093,
        user_id = 9
    )
    vancouver = Marker(
        caption = "Opioid capital of Canada",
        image_url = "https://upload.wikimedia.org/wikipedia/commons/5/57/Concord_Pacific_Master_Plan_Area.jpg",
        latitude = 49.2827,
        longitude = -123.1207,
        user_id = 6
    )
    dubai = Marker(
        caption = "What color is your Bugatti?",
        image_url = "https://miro.medium.com/v2/resize:fit:1358/1*sf4nQKh1ArnsfbT1uFly4w.jpeg",
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
