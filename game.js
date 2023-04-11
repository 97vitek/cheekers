let selected;
let moveWhite = true;
let figure, figureB, figureW;
let lastFocus 
let firstMove = false
let eatMove = false
let requiredFigures = []
let commonSteps = []
let commonRequiredSteps = []
let botRequiredFigures = []
let moved = false

let move = function(step, figure, steps, queenSteps, requiredEat, event) {

    if(figure.onfocus === null){
        return
    }
    if(figure.classList.contains("queen")){

        if(event.target.classList.contains("possible-move")){
            document.querySelectorAll(".can-move").forEach(item => item.classList.remove("can-move"))

            event.target.append(figure)
                

            document.querySelectorAll(".possible-move").forEach((item)=>{item.classList.remove("possible-move")})
            
            queenSteps.forEach((item, itemIndex, object) => { // удаление фигур
                if(item.move.id === event.target.id){
                    queenSteps.forEach((stepItem, index, queenSteps) => {
                        if(index < itemIndex && stepItem.direction === item.direction && stepItem.move.children[0]){
                            stepItem.move.children[0].remove()
                            eatMove = true
                        }
                    })
                }  
           })

           firstMove = true 
        }
        setTimeout(function(){
            figure.focus()
        }, 0)

        return

    }
    
    let step1 = steps[0];
    let step1Del = steps[1];
    let step2 = steps[2];
    let step2Del = steps[3];
    let step3 = steps[4];
    let step3Del = steps[5];
    let step4 = steps[6];
    let step4Del = steps[7];

    if(lastFocus != figure) {
        return
    }
    document.querySelectorAll(".can-move").forEach(item => item.classList.remove("can-move"))
    
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


    step.append(figure)
    firstMove = true
    if(+step.id.split("_", 2)[1] === 8 && figure.id === "figureW"){
        figure.classList.add("queen")
    }
    if(+step.id.split("_", 2)[1] === 1 && figure.id === "figureB"){
        figure.classList.add("queen")
    }
    step.onclick = "";
    step2.onclick = ""; //убираем возможность после нажатия переместить фигуру, через eventlistener не получилось почему-то(
    
    setTimeout(function(){
        figure.focus()
    }, 0)

    figure.onblur = () => {
        setTimeout(function(){
            figure.focus()
        }, 0)
    }

}


function requiredEat(step, enemyEat, steps, queenSteps, event) {

    let requiredSteps = []
    let figureSteps = []
    let figureReqSteps = []
    let figureWithSteps = {};
    let botReqFigure = {"figure": event, "requiredSteps": []}

    if(event.classList.contains("queen")){
        if(enemyEat.length > 0){
            document.querySelectorAll(".possible-move").forEach(item => item.classList.remove("possible-move"))
            enemyEat.forEach(item => { 
                item.move.classList.add("possible-move")
                item.move.onclick = move.bind(null, item.move, event, steps, queenSteps, enemyEat);
                requiredFigures.push(event)
                requiredSteps.push(item.move)
                botReqFigure.requiredSteps.push(item.move)
            })
        } else{
            steps.forEach(item => {
                item.move.onclick = move.bind(null, item.move, event, steps, queenSteps, null);
                figureSteps.push(item.move)
            })
            if(firstMove){
                eatMove = false
                event.onblur = ""
                event.blur()
            }
        }
        
    } else{

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
                step1.onclick = move.bind(null, step1, event, steps, null, null);
                step1.classList.add("possible-move") 
                figureSteps.push(step1)
            }

        }

        if(step2.id.split("_")[0] != 9 && !step2.children[0]) {
            if(step2.classList.contains("game")) { // ОГРАНИЧИВАЕМ поля хода
                step2.onclick = move.bind(null, step2, event, steps, null, null);
                step2.classList.add("possible-move") 
                figureSteps.push(step2)
            }
        }
        
        if(step3Del && step3.id.split("_")[0] != 0 && !step3.children[0]) {
            if(step3.classList.contains("game")) { // ОГРАНИЧИВАЕМ поля хода
                step3.onclick = move.bind(null, step3, event, steps, null, null);
                step3.classList.add("possible-move") 
                figureSteps.push(step3)
            }
        }

        if(step4Del && step4.id.split("_")[0] != 9 && !step4.children[0]) {
            if(step4.classList.contains("game")) { // ОГРАНИЧИВАЕМ поля хода
                step4.onclick = move.bind(null, step4, event, steps, null, null);
                step4.classList.add("possible-move") 
                figureSteps.push(step4)
            }
        }

 
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
            step.onclick = move.bind(null, step, event, steps, null, null);
            step.classList.add("possible-move") 
            commonRequiredSteps.push(step)
            botReqFigure.requiredSteps.push(step)
        })

    }
    if(botReqFigure.requiredSteps.length !=  0 && event.id === "figureB"){
        if(botRequiredFigures.length === 0){
            botRequiredFigures.push(botReqFigure)
        } else {
            botRequiredFigures.forEach(item => {
                if(item.figure === botReqFigure.figure){
                    item.requiredSteps.forEach(item => {
                        botReqFigure.requiredSteps.forEach( move=>{
                            if(item.id === move.id){
                                return
                            }
                        })

                    })
                }
                botRequiredFigures.push(botReqFigure)
            })
        }

    }

    if(figureSteps.length > 0 && event.id === "figureB"){
        figureWithSteps = {"figure": event, "PossibleSteps": figureSteps, "RequiredSteps":figureReqSteps} 

        commonSteps.push(figureWithSteps)
    } 

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
    moved = false
    commonSteps = []
    commonRequiredSteps = []
    botRequiredFigures = []
    moved = false
    let figures
    if (moveWhite){
        figures = document.querySelectorAll(`.figureW`)
        document.getElementById('whoPlay').innerText = "Ходят белые"
    } else {
         figures = document.querySelectorAll(`.figureB`)
         document.getElementById('whoPlay').innerText = "Ходят черные"
    }

    if(document.querySelectorAll(`.figureB`).length === 0){
        alert("Поздравляем! Выиграли белые!")
       if(confirm("Сыграем еще раз?")){
        location.reload()
       } else{
        return
       }
    }
    if(document.querySelectorAll(`.figureW`).length === 0){
        alert("Поздравляем! Выиграли Черные!")
       if(confirm("Сыграем еще раз?")){
        location.reload()
       } else{
        return
       }
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
function step(event) {
    for(let move of document.querySelectorAll(".possible-move")){
        move.classList.remove("possible-move")

    }

    let step1, step2, step3, step4, step1Del, step2Del, step3Del, step4Del;
    let steps = []

    let td = event.closest(`td`)
    let column = +td.id.split("_", 1)[0]
    let line = +td.id.split("_", 2)[1]
    let figureColor = event.id


    if(figureColor === "figureB" && moveWhite === true){
        let text = document.getElementById('whoPlay')
        text.innerText = "Ходят белые"
        text.classList.add("red")
        setTimeout(()=>text.classList.remove("red"), 1000)
        event.onblur = ""
        event.blur()
        return
    } 
    if(figureColor === "figureW" && moveWhite === false){
        let text = document.getElementById('whoPlay')
        text.innerText = "Ходят черные"
        text.classList.add("red")
        setTimeout(()=>text.classList.remove("red"), 1000)
        
        event.onblur = ""
        event.blur()
        return
    } 

    function queenStep(){
        let queenStep = []
        let queenPossbileStep = []
        let enemyEat = []
        let step
        let barrierDirection = 0

        for(let direction = 0; direction < 5; direction++){
            for(let allegedStep = 1; allegedStep < 10; allegedStep++){
                switch(direction){
                    case 1 :
                        step = {move: document.getElementById(`${column-allegedStep}_${line+allegedStep}`), direction:  direction}
                        if(step.move === null){
                            break
                        }
                        if(step.move.classList.contains("game")){
                            queenStep.push(step)
                        } 
                        break
                    case 2 :
                        step = {move: document.getElementById(`${column+allegedStep}_${line+allegedStep}`), direction:  direction}
                        if(step.move === null){
                            break
                        }
                        if(step.move.classList.contains("game")){
                            queenStep.push(step)
                        }
                        break
                    case 3 :
                        step = {move: document.getElementById(`${column-allegedStep}_${line-allegedStep}`), direction:  direction}
                        if(step.move === null){
                            break
                        }
                        if(step.move.classList.contains("game")){
                            queenStep.push(step)
                        }
                        break
                    case 4 :
                        step = {move: document.getElementById(`${column+allegedStep}_${line-allegedStep}`), direction:  direction}
                        if(step.move === null){
                            break
                        }
                        if(step.move.classList.contains("game")){
                            queenStep.push(step)
                        }
                        break
                }
            }
        }

        queenStep.forEach(function(item, index, object) {
            if(item.move.children[0] && item.move.children[0].id != event.id && barrierDirection != item.direction && barrierDirection != item.direction +"close"){
                barrierDirection = item.direction
                if(object[index+1] ){
                    if(!object[index+1].move.children[0] && object[index+1].direction === item.direction) {
                        enemyEat.push(object[index+1])
                    } 
                }
            } else if(item.move.children[0] && item.move.children[0].id != event.id && barrierDirection === item.direction) {
                if(object[index-1].move.children[0]) {
                    barrierDirection = item.direction+"close"
                }  else if(object[index+1]) {
                    if (!object[index+1].move.children[0] && object[index+1].direction === barrierDirection) {
                        enemyEat.push(object[index+1])
                    }
                } 
            } else if(item.move.children[0] && item.move.children[0].id === event.id){
                barrierDirection = item.direction+"close"
            } else if(barrierDirection === item.direction+"close"){

            } else if(!item.move.children[0] && barrierDirection != item.direction+"close" && enemyEat.length != 0 && barrierDirection === item.direction){
                enemyEat.push(object[index]) 
            }
            else{
                queenPossbileStep.push(item)
            }

        })
        queenPossbileStep.forEach(item => {
            item.move.classList.add("possible-move")
            if(firstMove){
                item.move.classList.remove("possible-move")                
                if(barrierDirection != item.direction + "close" && barrierDirection === item.direction ){
                    item.move.classList.add("possible-move")
                }
            }
            
        }) 
        requiredEat(null, enemyEat, queenPossbileStep, queenStep, event)
        queenStep = []
        
        return
    }
    if(event.classList.contains("queen")){
        if(event.id === "figureB" && !moveWhite){
            queenStep()
        }
        if(event.id === "figureW" && moveWhite){
            queenStep()
        }
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

        requiredEat(step, figure, steps, null, event)
    }

    if(!event.classList.contains("queen")){
        possibleMove()
    }

    event.onblur = function() { // тут у королевы снимается блюр перед ходом - вызывает проблемы, лучше подобную конструкцию у неев др месте сделать или посмотреть как решил у обычных
        lastFocus = event   
        for(let move of document.querySelectorAll(".possible-move")){
            move.classList.remove("possible-move")
        }
    }
    

}



