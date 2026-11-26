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


@app.route("/overgame")
def overgame():
    return render_template("gameover.html")

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/main-menu")
def main_menu():
    return render_template("main-menu.html")


@app.route("/highscores")
def highscores():
    return render_template("highscore.html")

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    print("Login attempt:", email)

    return jsonify({
        "success": True,
        "message": "Login request received!"
    })

@app.route("/help")
def help_page():
    return render_template("help.html")

@app.route("/highscore")
def highscore():
    return render_template("highscore.html")

@app.route("/level2")
def level2():
    return render_template("level2.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True, use_reloader=True)



