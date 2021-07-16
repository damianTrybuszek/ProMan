export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3,
    signIn: 4,
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.column:
            return columnBuilder
        case htmlTemplates.signIn:
            return signInBuilder
        default:
            console.error("Undefined template: " + template)
            return () => {
                return ""
            }
    }
}

function boardBuilder(board) {
    return `<div class="board-container">
                <section class="board" data-board-id="${board.id}" id="board${board.id}">
                    <div class="board-header">
                        <input class="board-title" maxlength="40" id="board-title-${board.id}" value="${board.title}">
                        <button class="board-add" data-board-id="${board.id}">Add Card</button>
                        <button class="board-toggle" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
                    </div>
           <div class="board-columns" data-board-id="${board.id}"></div>
                </section>
             </div> `
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" id="card${card.id}" draggable="true">
                <div class="card-remove" id="removeCard${card.id}"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title" id="cardTitle${card.id}">${card.title}</div>
            </div>`;
}

function columnBuilder(boardId, column) {
    return `<div class="board-column" id="column${column.id}">
                    <div class="board-column-title">${column.title}</div>
                    <div class="board${boardId}-column-content" data-column-id="${column.id}"></div>
            </div>`
}

function signInBuilder () {
    return `<div id="signInModal" class="modal">
    <div class="modal-content">
        <span align="right" class="close">&times;</span>
        <div align="center">
              <div align="center" class="border">
                 <div class="header">
                    <h1 class="word">Sign In Page</h1>
                 </div><br>
                    <h2 class="word">Please fill the form:</h2>
                 </div>
                <h2 class="word">
                    <form id="signInForm">
                      <div class="msg"></div><br>
                        <input id="email" name="email" type="text" placeholder="Enter Your Email" class="textbox"/><br><br>
                        <input id="password" name="password" type="password" placeholder="Enter Your Password" class="textbox"/><br><br>
                        <input id="login" type="submit" class="btn" value="Sign In"><br>
                    </form>
                </h2>
              </div>
            </div>
      </div>
    </div>`
}