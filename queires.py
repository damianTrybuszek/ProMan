import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_board(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards b
        WHERE b.id = %(board_id)s
        ;
        """
        , {"board_id": board_id}
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id}, False)

    return matching_cards


# def add_board(board_name):
#     data_manager.execute_insert(
#         """
#         INSERT INTO boards (title)
#         VALUES (%(board_name)s);
#         """
#         , {"board_name": board_name})


def get_statuses():
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        ;
        """
    )