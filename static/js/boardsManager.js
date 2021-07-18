import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import {cardsManager} from "./cardsManager.js";
import {columnsManager} from "./columnsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            domManager.addChild('#root', content);
            domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
            domManager.addEventListener(`#board-title-${board.id}`, "change", changeBoardTitle);
        }
    },

    createBoards: async function () {
        let input = document.getElementById('board-name-input').value;
        //todo: check on front if board with input name already exists
        dataHandler.checkIfBoardTitleExists(input)
        dataHandler.createNewBoard(input);
        let newBoard = {'id': null, 'title': input, 'is_deleted': false};
        const boardBuilder = htmlFactory(htmlTemplates.board);
        const content = boardBuilder(newBoard);
        domManager.addChild('#root', content);
        document.getElementById('board-name-input').value = ""
    }
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    if (clickEvent.target.innerHTML === "Hide") {
        let board = document.querySelector('#board' + boardId)
        let board_children = Array.from(board.children)
        let length = board.children.length;
        while (length > 2) {
            board.removeChild(board.lastChild);
            length--;
        }

        //todo: add allboards div and add id to it and via doc.sel set atrib hiden

        // for (let i = 0; i < board.childElementCount; i ++) {
        //     if (board.children[i].classList.includes('board-column')) {
        //         board.children[i].remove();
        //     }
        // }
        clickEvent.target.textContent = "Show"
    } else {
        columnsManager.loadColumns(boardId, function () {
            cardsManager.loadCards(boardId);
        })
        clickEvent.target.textContent = "Hide"
    }
}

function changeBoardTitle(clickEvent) {
    //todo: make input as inactive, activate it on click
    let target = clickEvent.target;
    let boardToUpdateID = target.id.slice(12, 16);
    let newBoardTitle = target.value;
    dataHandler.updateBoardTitle(boardToUpdateID, newBoardTitle)
}
