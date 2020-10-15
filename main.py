from flask import Flask, jsonify, request
from flask_cors import CORS
from database import database
import datetime

message_list = []

app = Flask(__name__)
cors = CORS(app)
database.Database.db_connection()

@app.route("/uhrzeit/", methods=["GET"])
def uhrzeit():
    return jsonify({"uhrzeit": datetime.datetime.now()})


@app.route("/send/", methods=["POST"])
def send_message():
    #import pdb; pdb.set_trace() Debuggen
    data = request.json
    data["time"] = str(datetime.datetime.now().time())
    print(data)
    message_list.append(data)
    return "send message"


@app.route("/messages/", methods=["GET"])
def get_messages():
    return jsonify(message_list)


if __name__ == '__main__':
    app.run(debug=True)