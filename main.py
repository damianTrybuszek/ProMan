from flask import Flask, render_template, url_for

import queires
from util import json_response

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queires.get_boards()


@app.route("/get-board/<int:board_id>")
@json_response
def get_board(board_id):
    return queires.get_board(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    All the boards
    """
    return queires.get_statuses()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    "something to commit in case of adding new branches"
    return queires.get_cards_for_board(board_id)


# @app.route("/add-board")
# @json_response
# def get_board(board_name):
#
#     return queires.add_board(board_name)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()