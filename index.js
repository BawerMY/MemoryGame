const cards = ["bowler-hat", "buddha", "edvard-munch", "kawaii-pizza", "pharaoh", "statue-of-liberty", "trojan-horse", "viking-ship","bowler-hat", "buddha", "edvard-munch", "kawaii-pizza", "pharaoh", "statue-of-liberty", "trojan-horse", "viking-ship"]


// INIT
function mixCards() {
    for (let i = 0; i < 10; i++) { // put a better random chooser
        let card1Id = Math.floor(Math.random() * 15.9999)
        let card2Id = Math.floor(Math.random() * 15.9999)
        let card1Value = cards[card1Id]
        cards[card1Id] = cards[card2Id]
        cards[card2Id] = card1Value
    }
}

mixCards()



// GAMEPLAY

function openCard(cardId) {
    document.getElementById("card-" + cardId).src = "images/" + cards[cardId] + ".png"
}

function closeCard(cardId) {
    document.getElementById("card-" + cardId).src = "images/question.png"
}

let state = 0
let openCardId = null
let pause = false

document.addEventListener("click", event => {
    if (event.target.id.slice(0, 4) === "card" && !pause && event.target.src.slice(-19) === "images/question.png") {
        if (state === 0) {
            openCardId = event.target.id.slice(5)
            openCard(openCardId)
            state = 1
        } else if (state === 1) {
            document.getElementById("move-counter").innerText = Number(document.getElementById("move-counter").innerText) + 1
            if (event.target.innerText !== cards[openCardId]) {
                openCard(event.target.id.slice(5))
                if (cards[openCardId] !== cards[event.target.id.slice(5)]) {
                    pause = true
                    setTimeout(() => {
                        closeCard(event.target.id.slice(5))
                        closeCard(openCardId)
                        pause = false
                        openCardId = null
                        state = 0
                    }, 1000)
                } else {
                    openCardId = null
                    state = 0
                }
            }
        }
    }
})