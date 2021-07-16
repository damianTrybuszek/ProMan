export let dataHandler = {
    getBoards: async function () {
        return await apiGet('/get-boards')
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        return await apiGet(`/get-boards/${boardId}`)
    },
    getIfBoardTitleExists: async function (boardId) {
        return await apiGet(`/get-if-board-title-exists`)
    },
    getConnections: async function (boardId) {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet('/get-connections/${boardId}')
    },
    getColumns: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet('/get-columns')
    },
    getColumn: async function (columnId) {
        // the status is retrieved and then the callback function is called with the status
        return await apiGet(`/get-columns/${columnId}`)
    },
    getColumnsByBoardId: async function (boardId) {
        return await apiGet(`/get-board-columns/${boardId}`)
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/get-board-cards/${boardId}`)
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
        return await apiGet(`/get-cards/${cardId}`)
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        await apiPost("/add-board", {'boardTitle': boardTitle})
    },
    createNewCard: async function (cardTitle, boardId, columnId) {
        // creates new card, saves it and calls the callback function with its data
        let newCardData = {"cardTitle": cardTitle, "boardId": boardId, "columnId": columnId}
        await apiPost("/add-card", newCardData)
    },
    updateBoardTitle: async function (boardId, newBoardTitle) {
        //updates board title in db
        let newBoardTitleToUpdate = {'boardID': boardId, 'newBoardTitle': newBoardTitle}
        await apiPut("/update-board-title", newBoardTitleToUpdate)
    },
    updateColumnTitle: async function (columnToUpdateID, newColumnTitle) {
        let newColumnTitleToUpdate = {'columnID': columnToUpdateID, 'newColumnTitle': newColumnTitle}
        await apiPut("/update-column-title", newColumnTitleToUpdate)
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: 'GET'
    })
    if (response.status === 200) {
        return response.json()
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.status === 200) {
        return response.json()
    }
}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: 'DELETE'
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}
