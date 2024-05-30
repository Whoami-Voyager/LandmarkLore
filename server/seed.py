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
    image_url="https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
    latitude=40.7128,
    longitude=-74.0060,
    user_id=2
    )
    tokyo = Marker(
    caption="Land of the Rising Sun",
    image_url="https://media.nomadicmatt.com/2024/tokyothings.jpeg",
    latitude=35.6895,
    longitude=139.6917,
    user_id=8
    )
    berlin = Marker(
    caption="Capital of Germany",
    image_url="https://i.natgeofe.com/n/b234ec7d-a988-4b75-9e65-749ddcbea7a0/citylife_berlin_2B4H3T1_web_3x2.jpg",
    latitude=52.5200,
    longitude=13.4050,
    user_id=10
    )
    toronto = Marker(
    caption="The Six",
    image_url="https://media.cntraveler.com/photos/5b2c0684a98055277ea83e26/1:1/w_2667,h_2667,c_limit/CN-Tower_GettyImages-615764386.jpg",
    latitude=43.651070,
    longitude=-79.347015,
    user_id=6
    )
    beijing = Marker(
    caption="Capital of China",
    image_url="https://cdn.britannica.com/20/20120-050-89764C76/Tiananmen-entryway-Imperial-City-China-Beijing.jpg",
    latitude=39.9042,
    longitude=116.4074,
    user_id=7
    )
    rio_de_janeiro = Marker(
    caption="Carnival Capital",
    image_url="https://media.timeout.com/images/105211701/image.jpg",
    latitude=-22.9068,
    longitude=-43.1729,
    user_id=4
    )
    cape_town = Marker(
    caption="Mother City",
    image_url="https://cdn.britannica.com/42/126842-050-0803BC41/Sea-Point-Cape-Town-SAf.jpg",
    latitude=-33.9249,
    longitude=18.4241,
    user_id=3
    )
    bangkok = Marker(
    caption="City of Angels",
    image_url="https://www.travelseewrite.com/wp-content/uploads/2022/09/Rattanakosin-is-the-royal-area-of-Bangkok.jpeg",
    latitude=13.7563,
    longitude=100.5018,
    user_id=2
    )
    mexico_city = Marker(
    caption="Tenochtitlán",
    image_url="https://i.natgeofe.com/n/6c02ad5a-977b-4f12-b9c0-02ffb0736e07/metropolitan-cathedral-zocalo-mexico-city.JPG",
    latitude=19.4326,
    longitude=-99.1332,
    user_id=7
    )
    singapore = Marker(
    caption="Lion City",
    image_url="https://www.thoughtco.com/thmb/C1Nbj1M6jZK9Xm_lgD1ndDPPAk4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/singapore--garden-by-the-bay--supertree-grove-638256268-fa59e7e78b6449aaa40f68eafe6ff1a1.jpg",
    latitude=1.3521,
    longitude=103.8198,
    user_id=8
    )
    madrid = Marker(
    caption="Heart of Spain",
    image_url="https://admin.expatica.com/es/wp-content/uploads/sites/2/2023/10/madrid.jpg",
    latitude=40.4168,
    longitude=-3.7038,
    user_id=1
    )
    istanbul = Marker(
    caption="City of Two Continents",
    image_url="https://www.civitatis.com/blog/wp-content/uploads/2024/03/shutterstock_291252509-1920x1248.jpg",
    latitude=41.0082,
    longitude=28.9784,
    user_id=5
    )
    seoul = Marker(
        caption="Soul of Asia",
        image_url="https://cdn.mos.cms.futurecdn.net/bwsDTWetLQuuwXQo44J5ZV.jpeg",
        latitude=37.5665,
        longitude=126.9780,
        user_id=8
    )
    cairo = Marker(
        caption="City of a Thousand Minarets",
        image_url="https://media.cntraveler.com/photos/655cdf1d2d09a7e0b27741b5/16:9/w_2560%2Cc_limit/Cairo%2520Egypt_GettyImages-1370918272.jpg",
        latitude=30.0444,
        longitude=31.2357,
        user_id=9
    )
    athens = Marker(
        caption="Birthplace of Democracy",
        image_url="https://www.visitgreece.gr/images/1743x752/jpg/files/s_1852670350_athens_1743x752.jpg",
        latitude=37.9838,
        longitude=23.7275,
        user_id=10
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
