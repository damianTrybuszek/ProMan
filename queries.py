import data_manager


def get_card_column(column_id):
    """
    Find the first column matching the given id
    :param column_id:
    :return: str
    """
    column = data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE id = %(column_id)s AND is_deleted = FALSE
        ;
        """, {"column_id": column_id})

    return column


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE is_deleted = FALSE
        ;
        """
    )


def get_board(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards b
        WHERE b.id = %(board_id)s AND b.is_deleted = FALSE
        ;
        """, {"board_id": board_id}
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE board_id = %(board_id)s AND is_deleted = FALSE
        ;
        """, {"board_id": board_id})
    return matching_cards


def get_card(card_id):
    card = data_manager.execute_select(
        """
        SELECT * FROM cards c
        WHERE c.id = %(card_id)s AND c.is_deleted = FALSE
        ;
        """, {"card_id": card_id}, False)

    return card


def get_columns(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM columns c
        WHERE c.board_id = %(board_id)s AND is_deleted = FALSE
        ;
        """, {"board_id": board_id}
    )


def get_column(column_id):
    return data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE id = %(column_id)s AND is_deleted = FALSE
        ;
        """, {"column_id": column_id}, False)


def get_board_columns(board_id):
    data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE board_id = %(board_id)s AND is_deleted = FALSE
        """, {"boardId": board_id}
    )


def add_board(board_title):
    if not check_if_board_title_exist(board_title):
        data_manager.execute_insert(
            """
            INSERT INTO boards (title)
            VALUES (%(board_title)s);
            """, {"board_title": board_title})


def check_if_board_title_exist(board_title):
    board_id = data_manager.execute_select("""
    SELECT id FROM boards
    WHERE title = (%(board_title)s)
    """, {"board_title": board_title})
    if board_id:
        return True
    return False


def update_board_title(board_id, new_board_title):
    data_manager.execute_insert(
        """
        UPDATE boards
        SET title = (%(new_board_title)s)
        WHERE id = (%(board_id)s)
        """, {'board_id': board_id, 'new_board_title': new_board_title}
    )


def update_column_title(column_to_update_id, new_column_title):
    data_manager.execute_insert(
        """
        UPDATE columns
        SET title = (%(new_column_title)s)
        WHERE id = (%(column_to_update_id)s)
        """, {'new_column_title': new_column_title, 'column_to_update_id': column_to_update_id}
    )


def register_new_user(email, password):
    data_manager.execute_insert(
        """
        INSERT INTO users (email, password) 
        values (%(email)s, %(password)s)
        """, {'email': email, 'password': password}
    )


def check_new_user(email):
    query = f"SELECT * FROM users WHERE email='{email}';"
    return data_manager.execute_select(
        f"""
        SELECT email
        FROM users
        WHERE email='{email}';
        """, {'email' : email}, False
    )


def login(email, fetchall=True):
    return data_manager.execute_select(
        """
        SELECT id, email, password 
        FROM users 
        where email=%(email)s
        """, {'email': email}, fetchall)


def get_user_by_id(user_id):
    return data_manager.execute_select(
        """
        SELECT * 
        FROM users
        WHERE id=%(id)s
        """, {'id': user_id}, False
    )
