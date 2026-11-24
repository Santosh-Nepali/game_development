from flask import Flask, request, render_template, jsonify, json
import os

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/signup")
def signup():
    return render_template("signup.html")


@app.route("/gameover")
def gameover():
    return render_template("gameover.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True, use_reloader=True)
