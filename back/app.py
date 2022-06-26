from flask import Flask, request
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
import kurly_api
import kurly_crawl

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록

@api.route('/kurly')
class Kurly(Resource):
    def get(self):
        print(request.headers)
        return kurly_api.get(request.args.to_dict())

    def delete(self):
        print(request.headers)
        return kurly_api.delete(request.args.to_dict())

@api.route('/kurly-refresh')
class Kurly_refresh(Resource):
    def post(self):
        print(request.headers)
        return kurly_crawl.crawl()


@api.route('/kurly-ban')
class Kurly_Ban(Resource):
    def post(self):
        print(request.headers)
        return kurly_api.add_ban_keyword(request.get_json())

@app.after_request
def add_security_headers(resp):
    resp.headers['access-control-allow-origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
    return resp

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8011)
    