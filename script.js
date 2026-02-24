console.log("hi there")
let turn = "X"
let CurrentTurn = document.getElementsByClassName("turn")
let victoryAnimation 
let victoryInfo
let resetBtn = document.querySelector("div.reset-game")
let playBtn = document.querySelector("div.play-again")
resetBtn.addEventListener("click",() => {
    location.reload()
})

playBtn.addEventListener("click",() => {
    turn = "X"
    CurrentTurn[0].innerText = `Turn For ${turn}`
    let boxes = document.getElementsByClassName("box")
    let boxtext = document.getElementsByClassName("boxtext")
    Array.from(boxes).forEach(btn => {
        btn.style.border="3px solid #0816155e"
    })

    boxes[0].style.borderLeft="none"
    boxes[0].style.borderTop="none"
    boxes[1].style.borderTop="none"
    boxes[2].style.borderTop="none"
    boxes[2].style.borderRight="none"
    boxes[3].style.borderLeft="none"
    boxes[5].style.borderRight="none"
    boxes[6].style.borderLeft="none"
    boxes[6].style.borderBottom="none"
    boxes[7].style.borderBottom="none"
    boxes[8].style.borderRight="none"
    boxes[8].style.borderBottom="none"

    Array.from(boxtext).forEach(elem => {
        elem.style.display="inline"
        elem.innerText=""
        elem.style.translate="none"
        elem.style.transform="none"
    })
})

let score = { 
    x:0, 
    o:0
}
const scoreFunction = () => {
    if (turn==="X") {
        score.x+=1
        document.getElementById("scoreX").innerText=score.x
    }
    else {
        score.o+=1
        document.getElementById("scoreO").innerText=score.o
    }
} 

const changeTurn = () => { return turn === "X" ? "O":"X"}

const GameWinner = () => {
    let boxtext = document.getElementsByClassName("boxtext")
    let win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i=0; i<win.length; i++) {
            if ( (boxtext[win[i][0]].innerText!=="") && (boxtext[win[i][0]].innerText===boxtext[win[i][1]].innerText) && (boxtext[win[i][0]].innerText===boxtext[win[i][2]].innerText) ) {
                victoryAnimation = i
                victoryInfo = win[i]
                // console.log(victoryAnimation,victoryInfo)
                return true
            }
        }
    }        

const TieChecker = () => {
    let boxtext = document.getElementsByClassName("boxtext") 
    let t = true
    Array.from(boxtext).forEach (elem => {
        if (elem.innerText==="") {
            t = false
        }
    })
    return t
}

const finalAnimation = () => {
    let boxes = document.getElementsByClassName("box")
    let boxtext = document.getElementsByClassName("boxtext")
    if (victoryAnimation===0) {
        boxtext[0].style.translate="100px 100px"
        boxtext[0].style.transform="scale(3)"
        boxtext[1].style.translate="0px 100px"
        boxtext[1].style.transform="scale(3)"
        boxtext[2].style.translate="-100px 100px"
        boxtext[2].style.transform="scale(3)"
    }
    else if (victoryAnimation===1) {
        boxtext[3].style.translate="100px"
        boxtext[3].style.transform="scale(3)"
        boxtext[4].style.transform="scale(3)"
        boxtext[5].style.translate="-100px"
        boxtext[5].style.transform="scale(3)"
    }
    else if (victoryAnimation===2) {
        boxtext[6].style.translate="100px -100px"
        boxtext[6].style.transform="scale(3)"
        boxtext[7].style.translate="0px -100px"
        boxtext[7].style.transform="scale(3)"
        boxtext[8].style.translate="-100px -100px"
        boxtext[8].style.transform="scale(3)"
    }
    else if (victoryAnimation===3) {
        boxtext[0].style.translate="100px 100px"
        boxtext[0].style.transform="scale(3)"
        boxtext[3].style.translate="100px"
        boxtext[3].style.transform="scale(3)"
        boxtext[6].style.translate="100px -100px"
        boxtext[6].style.transform="scale(3)"
    }
    else if (victoryAnimation===4) {
        boxtext[1].style.translate="0px 100px"
        boxtext[1].style.transform="scale(3)"
        boxtext[4].style.transform="scale(3)"
        boxtext[7].style.translate="0px -100px"
        boxtext[7].style.transform="scale(3)"
    }
    else if (victoryAnimation===5) {
        boxtext[2].style.translate="-100px 100px"
        boxtext[2].style.transform="scale(3)"
        boxtext[5].style.translate="-100px"
        boxtext[5].style.transform="scale(3)"
        boxtext[8].style.translate="-100px -100px"
        boxtext[8].style.transform="scale(3)"
    }
    else if (victoryAnimation===6) {
        boxtext[0].style.translate="100px 100px"
        boxtext[0].style.transform="scale(3)"
        boxtext[4].style.transform="scale(3)"
        boxtext[8].style.translate="-100px -100px"
        boxtext[8].style.transform="scale(3)"
    }
    else if (victoryAnimation===7) {
        boxtext[2].style.translate="-100px 100px"
        boxtext[2].style.transform="scale(3)"
        boxtext[4].style.transform="scale(3)"
        boxtext[6].style.translate="100px -100px"
        boxtext[6].style.transform="scale(3)"
    }

    Array.from(boxes).forEach(e => {e.style.border="0px solid transparent"})
    for (let i=0; i<boxtext.length; i++) {
        // console.log(victoryInfo,i,)
        if (victoryInfo.includes(i)) {
            // console.log(victoryInfo,victoryAnimation)
            continue
        }
        else {
            boxtext[i].style.display="none"
        }
    }
}

let boxes = document.getElementsByClassName("box")

Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext")
    element.addEventListener("click",() => {
        if (boxtext.innerText==="") {
        if (!GameWinner()) {
        boxtext.innerText = turn }
            if (GameWinner()) {
                CurrentTurn[0].innerText = `${turn} Wins`
                finalAnimation()
                scoreFunction()
            } 
            else if (!GameWinner() && !TieChecker()) {
                turn = changeTurn()
                CurrentTurn[0].innerText = `Turn For ${turn}`
            }
            else if (TieChecker()) {
                CurrentTurn[0].innerText = `Match Ties`
            }
        }
    })
})