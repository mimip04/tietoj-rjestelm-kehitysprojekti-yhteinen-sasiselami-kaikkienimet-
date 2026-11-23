
from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

JSON_URL = "https://users.metropolia.fi/~peterh/mps.json"


# Etusivu
@app.route("/")
def home():
    return render_template("frontend.html")


# Haetaan kansanedustajien tiedot
@app.route("/api/mps")
def get_mps():
    try:
        response = requests.get(JSON_URL, timeout=15)
        response.raise_for_status()

        data = response.json()

        return jsonify(data)

    except requests.RequestException as error:
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    app.run(debug=True)

