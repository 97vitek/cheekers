let selected;
let moveWhite = true;
let figure, figureB, figureW;
let lastFocus 
let firstMove = false
let eatMove = false
let requiredFigures = []


let move = function(step, figure, steps, event) {
    if(figure.onfocus === null){
        return
    }
    document.querySelectorAll(".can-move").forEach(item => item.classList.remove("can-move"))
    let step1 = steps[0];
    let step1Del = steps[1];
    let step2 = steps[2];
    let step2Del = steps[3];
    let step3 = steps[4];
    let step3Del = steps[5];
    let step4 = steps[6];
    let step4Del = steps[7];
    
    if(step === step1 && step1Del != undefined) {
        if(step1Del.children[0].id != figure.id) {
            step1Del.children[0].remove()
            eatMove = true
        }
    }
    if(step === step2 && step2Del != undefined) {
        if(step2Del.children[0].id != figure.id) {
            step2Del.children[0].remove()
            eatMove = true
        }
    }
    if(step === step3 && step3Del != undefined) {
        if(step3Del.children[0].id != figure.id) {
            step3Del.children[0].remove()
            eatMove = true
        }
    }
    if(step === step4 && step4Del != undefined) {
        if(step4Del.children[0].id != figure.id) {
            step4Del.children[0].remove()
            eatMove = true
        }
    }

    if(lastFocus != figure) {
        return
    }
    step.append(figure)
    firstMove = true
    step.onclick = "";
    step2.onclick = ""; //убираем возможность после нажатия переместить фигуру, через eventlistener не получилось почему-то(
    
    figure.focus()
    figure.onblur = () => {
        figure.focus()

    }
}
function requiredEat(step, figure, steps, event) {
    let step1 = steps[0];
    let step1Del = steps[1];
    let step2 = steps[2];
    let step2Del = steps[3];
    let step3 = steps[4];
    let step3Del = steps[5];
    let step4 = steps[6];
    let step4Del = steps[7];

    if(step1.id.split("_")[0] != 0 && !step1.children[0]) {
        if(step1.classList.contains("game")) { // ОГРАНИЧИВАЕМ поля хода
            step1.onclick = move.bind(null, step1, event, steps);
            step1.classList.add("possible-move") 
        }
    }

    if(step2.id.split("_")[0] != 9 && !step2.children[0]) {
        if(step2.classList.contains("game")) { // ОГРАНИЧИВАЕМ поля хода
            step2.onclick = move.bind(null, step2, event, steps);
            step2.classList.add("possible-move") 
        }
    }
    
    if(step3Del && step3.id.split("_")[0] != 0 && !step3.children[0]) {
        if(step3.classList.contains("game")) { // ОГРАНИЧИВАЕМ поля хода
            step3.onclick = move.bind(null, step3, event, steps);
            step3.classList.add("possible-move") 
        }
    }

    if(step4Del && step4.id.split("_")[0] != 9 && !step4.children[0]) {
        if(step4.classList.contains("game")) { // ОГРАНИЧИВАЕМ поля хода
            step4.onclick = move.bind(null, step4, event, steps);
            step4.classList.add("possible-move") 
        }
    }

    let requiredSteps = []
    for(let i = 0; i < steps.length; i++) {
        if(i % 2 === 0) {
            if(steps[i+1] != undefined) {
                if(steps[i].children[0] === undefined && steps[i].classList.contains("game")) {
                    let moves = document.querySelectorAll(".possible-move")
                    moves.forEach(function(move) {
                        move.onclick = ""
                        move.classList.remove("possible-move") 
                    }) 
                    
                    requiredSteps.push(steps[i])
                    if(requiredFigures.length === 0){
                        requiredFigures.push(event)
                    }
                    requiredFigures.find(item=>{
                        if(item != event) {
                            requiredFigures.push(event)
                        }
                    })
                } 
            } 
        }
    } 

    requiredSteps.forEach((step) => {
        step.onclick = move.bind(null, step, event, steps);
        step.classList.add("possible-move") 
    })

    if(firstMove && eatMove === false ){
        let moves = document.querySelectorAll(".possible-move")
        moves.forEach(function(move) {
            move.onclick = ""
            move.classList.remove("possible-move") 
        })
        event.onblur = ""
        event.blur()
        moveWhite = !moveWhite
        firstMove = false
        eatMove = false
        requiredFigures=[]
        changeofCourse(event)
        return
    } else if(firstMove && requiredSteps.length === 0 && eatMove === true){
        console.log(firstMove)
        let moves = document.querySelectorAll(".possible-move")
        moves.forEach(function(move) {
            move.onclick = ""
            move.classList.remove("possible-move") 
        })
        event.onblur = ""
        event.blur()
        moveWhite = !moveWhite
        requiredFigures=[]
        firstMove = false
        eatMove = false
        changeofCourse(event)
        return
    }
    
    if(!document.querySelector(".possible-move")) {
        event.onblur = ""
        event.blur()
    }

}
function changeofCourse(){
    let figures

    if (moveWhite){
        figures = document.querySelectorAll(`.figureW`)
    } else {
         figures = document.querySelectorAll(`.figureB`)
    }

    figures.forEach(function(item){
        item.setAttribute("onfocus", "step(event.target)") 
        item.tabIndex = 0
        step(item)
        document.querySelectorAll(".possible-move").forEach((item) => {
            item.classList.remove("possible-move")
        })
    })

    if(requiredFigures.length > 0){
        figures.forEach(function(item){
            item.removeAttribute("onfocus") 
            item.removeAttribute("tabindex")
        })
        requiredFigures.forEach(function(item){
            step(item)
            item.setAttribute("tabindex", 0)
            item.setAttribute("onfocus", "step(event.target)") 
            item.classList.add("can-move")
            item.focus()
        })
    }

    requiredFigures = []

}
function step(event) {//на onfocus срабатывет  выделять ходы возможные + на onblur убирать все выделения ходов 

    let step1, step2, step3, step4, step1Del, step2Del, step3Del, step4Del;
    let steps = []

    let td = event.closest(`td`)
    let column = +td.id.split("_", 1)[0]
    let line = +td.id.split("_", 2)[1]
    let figureColor = event.id


    if(figureColor === "figureB" && moveWhite === true){
        console.log("ходят белые")
        event.onblur = ""
        event.blur()
        return
    } 
    if(figureColor === "figureW" && moveWhite === false){
        console.log("ходят черные")
        event.onblur = ""
        event.blur()
        return
    } 

    function possibleMove() {
        if(figureColor === "figureW"){
            step1 = document.getElementById(`${column-1}_${line+1}`)
            step2 = document.getElementById(`${column+1}_${line+1}`)
            step3 = document.getElementById(`${column-1}_${line-1}`)
            step4 = document.getElementById(`${column+1}_${line-1}`)
        }
        if(figureColor === "figureB"){
            step1 = document.getElementById(`${column-1}_${line-1}`)
            step2 = document.getElementById(`${column+1}_${line-1}`)
            step3 = document.getElementById(`${column-1}_${line+1}`)
            step4 = document.getElementById(`${column+1}_${line+1}`)
        }

        if(step1.children[0]) {
            checkFigure(step1)
        }
        if(step2.children[0]) {
            checkFigure(step2)
        }
        if(step3.children[0]) {
            checkFigure(step3)
        }
        if(step4.children[0]) {
            checkFigure(step4)
        }
        function checkFigure(step) {
            if(step.children[0].id === figureColor){
                return
            }
            if(figureColor === "figureW"){
                switch(step){
                    case step1 :
                        step1Del = step1
                        step1 = document.getElementById(`${column-2}_${line+2}`)
                        break;
                    case step2 : 
                        step2Del = step2
                        step2 = document.getElementById(`${column+2}_${line+2}`)
                        break;
                    case step3 :
                        step3Del = step3
                        step3 =  document.getElementById(`${column-2}_${line-2}`)
                        break;
                    case step4 :
                        step4Del = step4
                        step4 =  document.getElementById(`${column+2}_${line-2}`)
                        break;

                }        
            }
            if(figureColor === "figureB") {
                switch(step){
                    case step1 :
                        step1Del = step1
                        step1 = document.getElementById(`${column-2}_${line-2}`)
                        break;
                    case step2 : 
                        step2Del = step2
                        step2 = document.getElementById(`${column+2}_${line-2}`)
                        break;
                    case step3 :
                        step3Del = step3
                        step3 =  document.getElementById(`${column-2}_${line+2}`)
                        break;
                    case step4 :
                        step4Del = step4
                        step4 =  document.getElementById(`${column+2}_${line+2}`)
                        break;
                }
            }
            
        }
        steps.push(step1, step1Del, step2, step2Del, step3, step3Del, step4, step4Del)

        requiredEat(step, figure, steps, event)
    }

    possibleMove()
   
   
    event.onblur = function() {
        lastFocus = event
        for(let move of document.querySelectorAll(".possible-move")){
            move.classList.remove("possible-move")
        }
    }


}

    


// function play(){//ХОДЫ БОТА
//     let figures = document.querySelectorAll('.figureW');
//     let figuresNumber = Math.floor(Math.random()*(figures.length))
//     console.log(figures[figuresNumber].parentElement)
//     let player = figures[figuresNumber].onclick()
//     if ((step1.style.border = "2px solid green") && (step2.style.border = "2px solid green")){
//         let randomStep = Math.round(Math.random()*(2-1)+1);
//         step1.onclick,step2.onclick=move;
//         if (randomStep = 1){
//             step1.click()
//         } else {
//             step2.click()
//         }
//     }
//     else if (step1.style.border = "2px solid green"){
//         step1.onclick=move
//         step1.click()
//     }
//     else if (step2.style.border = "2px solid green"){
//         step2.onclick=move
//         step2.click()
//     } 
// }



// function whiteStep(event){//на onfocus срабатывет должно выделять ходы возможные + на onblur убирать все выделения ходов 
//     let td = event.target.closest(`td`)
//     let column = +td.id.split("_", 1)[0]
//     let line = +td.id.split("_", 2)[1]
//     let figureColor = event.target.id

//     possibleMove()
//     function possibleMove(){
//         if(figureColor === "figureW"){
//             let step1 = document.getElementById(`${column-1}_${line+1}`)
//             let step2 = document.getElementById(`${column+1}_${line+1}`)
//             if(column-1 != 0 && !step1.children[0].id === figureColor){
//                 step1.onclick = move.bind(null, step1, step2);
//                 step1.classList.add("possible-move") 
//             }
    
//             if(column+1 != 9 && !step2.children[0].id === figureColor){
//                 step2.onclick = move.bind(null, step2, step1);
//                 step2.classList.add("possible-move") 
//             }
//             if(!document.querySelector(".possible-move")){
//                 alert("нет доступных ходов")
//                 event.target.blur()
//             }
//             if(figureColor === "figureB"){
                
//             }
//         }



//    }