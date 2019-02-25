const s = selektor => document.getElementById(selektor)
let drawString = ""
const numbersList = s("section-numbers")
const nizSlova = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const brojevi = []
const start = s("start")
const task = s("task")
let vreme = 5000
let brojac = -1
let interval
let game = false
const hit = s("hit")
const miss = s("miss")
const left = s("left")
let potez = false
let neodigrano
let dodaoKlasu = false
let indikator = true 


function napuniNiz() {
    for (let index = 0; index < 26; index++) {
        brojevi[index] = Math.floor(Math.random() * (27 - 1)) + 1
        for (j = 0; j < brojevi.length - 1; j++) {
            if (brojevi[index] == brojevi[j]) {
                brojevi.splice(index)
                index--
            }
        }
        
    }
}


function stopTheGame() {
    brojac = -1
    clearInterval(interval)
    task.innerHTML = "Kraj igre!"
    game = false
    start.innerHTML = "Pokreni igru"
    s("easy").removeAttribute("disabled")
    s("medium").removeAttribute("disabled")
    s("hard").removeAttribute("disabled")
    start.removeAttribute("disabled")
    s("naslov").innerHTML = "Kraj igre!"
    window.close();
}

function intervalGame() {
    s("naslov").innerHTML = "Sad!"
    brojac++
    task.innerHTML = brojevi[brojac]
    if (!dodaoKlasu) {
        let temp = brojevi[brojac - 1]
        s(`number${temp}`).classList.add("number-wrong")
        if (indikator) {
            let temp3 = Number(miss.innerHTML)
            temp3++
            miss.innerHTML = temp3
            let temp2 = Number(left.innerHTML)
            temp2--
            left.innerHTML = temp2
            indikator = false
        }
    }
    if (neodigrano) {
        let temp = Number(miss.innerHTML)
        temp++
        miss.innerHTML = temp
        let temp2 = Number(left.innerHTML)
        temp2--
        left.innerHTML = temp2
        dodaoKlasu = false
    }
    indikator = false
    potez = false
    dodaoKlasu = false
    neodigrano = true
    if (brojac > 25) {
        stopTheGame()
    }
}

function ocistiPolje() {
    for (let i = 1; i < 27; i++) {
        s(`number${i}`).classList.remove("number-correct")
        s(`number${i}`).classList.remove("number-wrong")
    }
}


for (let i = 1; i < 27; i++) {
    let tempDraw = `
        <div class="number-item" id="number${i}">
            <h3>${nizSlova[i - 1]} (${i})</h3>
        </div>
    `
    drawString += tempDraw
}

numbersList.innerHTML = drawString

start.addEventListener("click", function () {
    if (!game) {
        ocistiPolje()
        neodigrano = false
        s("easy").setAttribute("disabled", true)
        s("medium").setAttribute("disabled", true)
        s("hard").setAttribute("disabled", true)
        s("naslov").innerHTML = "Priprema!"
        task.innerHTML = "Pozor!"
        napuniNiz()
        game = true
        start.innerHTML = "Stop Game"
        interval = setInterval(intervalGame, vreme)
        hit.innerHTML = 0
        miss.innerHTML = 0
        left.innerHTML = 26
        indikator = true
    } else {
        stopTheGame()
    }
})

document.addEventListener("keypress", function (e) {
    if (e.keyCode >= 97 && e.keyCode <= 122 && game == true && potez == false) {
        potez = true
        if (e.keyCode == (Number(task.innerHTML) + 96)) {
            s(`number${task.innerHTML}`).classList.add("number-correct")
            dodaoKlasu = true
            let temp = Number(hit.innerHTML)
            temp++
            hit.innerHTML = temp
            let temp2 = Number(left.innerHTML)
            temp2--
            left.innerHTML = temp2
            neodigrano = false
        } else {
            s(`number${task.innerHTML}`).classList.add("number-wrong")
            dodaoKlasu = true
            let temp = Number(miss.innerHTML)
            temp++
            miss.innerHTML = temp
            let temp2 = Number(left.innerHTML)
            temp2--
            left.innerHTML = temp2
            neodigrano = false
        }
    }
})

s("easy").addEventListener("change", function () {
    vreme = 5000
})
s("medium").addEventListener("change", function () {
    vreme = 3500
})
s("hard").addEventListener("change", function () {
    vreme = 2000
})