from services import *
from models import *

@app.route('/')
def normal():
    return '<h1>This is the home route<h1>'

@app.route('/markers', methods = ['GET','POST'])
def markers():
    if request.method == "GET":
        markers = Marker.query.all()
        mark = [item.to_dict() for item in markers]
        return mark, 200
    elif request.method == "POST":
        data = request.get_json()
        try:
            new_marker = Marker(
                caption=data['caption'],
                image_url=data['image_url'],
                latitude=data['latitude'],
                longitude=data['longitude'],
                user_id=data['user_id']
            )
            db.session.add(new_marker)
            db.session.commit()
            return new_marker.to_dict(), 201
        except Exception as e:
            print(e)
            return {"error": "post failed"}, 500

@app.route('/marker/<int:id>', methods = ['PATCH', 'DELETE'])
def marker(id):
    marker = Marker.query.filter(Marker.id == id).first()
    if marker:
        if request.method == "PATCH":
            data = request.get_json()
            for info in data:
                setattr(marker, info, data[info])
            db.session.add(marker)
            db.session.commit()
            return marker.to_dict(), 200
        elif request.method == "DELETE":
            db.session.delete(marker)
            db.session.commit()
            return {}, 204
    else:
        return {'error': 'could not find marker'}, 404

@app.route('/users', methods = ['GET', 'POST'])
def users():
    if request.method == "GET":
        users = User.query.all()
        user = [item.to_dict() for item in users]
        return user, 200
    elif request.method == "POST":
        data = request.get_json()
        try:
            new_user = User(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                icon=data['icon']
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except Exception as e:
            print(e)
            return {"error": "post failed"}, 500

@app.route('/user/<int:id>', methods = ['PATCH', 'DELETE'])
def user(id):
    user = User.query.filter(User.id == id).first()
    if user:
        if request.method == "PATCH":
            data = request.get_json()
            for bit in data:
                setattr(user, bit, data[bit])
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 200
        elif request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()
            return {}, 204
    else:
        return {'error': 'could not find user'}, 404

@app.route('/log', methods = ['POST', 'DELETE'])
def account():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user = User.query.filter(User.username == data['username']).first()
            if user:
                if user.check_password(data['password']):
                    session['user_id'] = user.id
                    return user.to_dict(), 201
                else:
                    return {"error":"Not valid password"}, 400
            else:
                return {"error":"Not valid username"}, 400
        except Exception as e:
            print(e)
            return {'error': 'login failed, please try again'}, 500
    elif request.method == 'DELETE':
        session.pop('user_id')
        return {}, 204

@app.route('/session')
def session():
    if session.get('user_id'):
        user = User.query.filter(User.id == session.get('user_id')).first()
        return user.to_dict()
    else:
        return {'not logged in'}, 401

if __name__ == '__main__':
    app.run(port=5555, debug=True)