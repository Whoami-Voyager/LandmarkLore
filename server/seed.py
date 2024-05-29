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
    new_york = Marker(
    caption="The city that never sleeps",
    image_url="https://www.nycgo.com/images/made/1.-Jin-Joo-Kim_600_399_70.jpg",
    latitude=40.7128,
    longitude=-74.0060,
    user_id=2
    )
    tokyo = Marker(
    caption="Land of the Rising Sun",
    image_url="https://www.japan.travel/content/dam/nto/en/images/experience/attractions/guides/culture-and-heritage/001_top/001_main/001_main.jpg",
    latitude=35.6895,
    longitude=139.6917,
    user_id=8
    )
    berlin = Marker(
    caption="Capital of Germany",
    image_url="https://cdn.getyourguide.com/img/location/5ffebf4ba07fb.jpeg/99.jpg",
    latitude=52.5200,
    longitude=13.4050,
    user_id=10
    )
    toronto = Marker(
    caption="The Six",
    image_url="https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/99/a6/22.jpg",
    latitude=43.651070,
    longitude=-79.347015,
    user_id=11
    )
    beijing = Marker(
    caption="Capital of China",
    image_url="https://www.travelchinaguide.com/images/city/beijing/beijing.jpg",
    latitude=39.9042,
    longitude=116.4074,
    user_id=12
    )
    rio_de_janeiro = Marker(
    caption="Carnival Capital",
    image_url="https://media.timeout.com/images/105211701/image.jpg",
    latitude=-22.9068,
    longitude=-43.1729,
    user_id=13
    )
    cape_town = Marker(
    caption="Mother City",
    image_url="https://cdn.britannica.com/69/195669-050-535A27B4/Table-Mountain-Cape-Town-South-Africa.jpg",
    latitude=-33.9249,
    longitude=18.4241,
    user_id=14
    )
    bangkok = Marker(
    caption="City of Angels",
    image_url="https://www.bangkok.com/info/images/bangkok-highlights.jpg",
    latitude=13.7563,
    longitude=100.5018,
    user_id=15
    )
    mexico_city = Marker(
    caption="Tenochtitlán",
    image_url="https://static.dw.com/image/59912386_303.jpg",
    latitude=19.4326,
    longitude=-99.1332,
    user_id=16
    )
    singapore = Marker(
    caption="Lion City",
    image_url="https://www.visitsingapore.com/content/dam/desktop/global/about-singapore/our-story/city-scape-architecture/vs-2023-marina-bay-sands-skyline-d.jpg",
    latitude=1.3521,
    longitude=103.8198,
    user_id=17
    )
    madrid = Marker(
    caption="Heart of Spain",
    image_url="https://www.planetware.com/wpimages/2020/02/spain-madrid-attractions-top-attractions-plaza-mayor.jpg",
    latitude=40.4168,
    longitude=-3.7038,
    user_id=18
    )
    istanbul = Marker(
    caption="City of Two Continents",
    image_url="https://images.unsplash.com/photo-1580327330312-efd14c01aa6d",
    latitude=41.0082,
    longitude=28.9784,
    user_id=19
    )
    seoul = Marker(
        caption="Soul of Asia",
        image_url="https://cdn.britannica.com/72/160272-050-6208AC9B/Seoul-South-Korea.jpg",
        latitude=37.5665,
        longitude=126.9780,
        user_id=20
    )
    cairo = Marker(
        caption="City of a Thousand Minarets",
        image_url="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/3c/3f/33.jpg",
        latitude=30.0444,
        longitude=31.2357,
        user_id=21
    )
    athens = Marker(
        caption="Birthplace of Democracy",
        image_url="https://www.history.com/.image/t_share/MTYxNzAyNTgxOTMyNDkzMTcw/parthenon-ancient-greece-gettyimages-143705558.jpg",
        latitude=37.9838,
        longitude=23.7275,
        user_id=22
    )
    
    db.session.add_all([
    denver, london, rome, moscow, sydney, vancouver, dubai, new_york,
    tokyo, berlin, toronto, beijing, rio_de_janeiro, cape_town, bangkok,
    mexico_city, singapore, madrid, istanbul, seoul, cairo, athens
    ])
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
