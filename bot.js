
let whoPlay = document.getElementById("whoPlay")
let observer = new MutationObserver (play);

function start(event){
    observer.observe(whoPlay,{
        childList: true,
        subtree:true,
        characterData: true,
    })
}


function play(figure){
    // setTimeout(function(){
    if(moveWhite){
        return
    }

        console.log("syka zdes")
    commonSteps = []
    commonRequiredSteps = []
    botRequiredFigures = []
    let randomFigure
    let eventFocus = new Event("focus", {bubbles: true})
    let eventMove = new Event("click", {bubbles: true})

    let figures = document.querySelectorAll(`.figureB`)

    if(moved){


        console.log('moved')
        lastFocus.setAttribute("onfocus", "step(event.target)") 
        lastFocus.tabIndex = 0
        step(lastFocus)
        document.querySelectorAll(".possible-move").forEach((item) => {
            item.classList.remove("possible-move")
        })
        if(botRequiredFigures.length > 0 && eatMove){
            let numberFigure
             botRequiredFigures.forEach(function (item, index) {
                if(item.figure === lastFocus){
                    numberFigure = index
                    return
                }
                
            })

            lastFocus.dispatchEvent(eventFocus)
            let randomClick = Math.round(Math.random() * (botRequiredFigures[numberFigure].requiredSteps.length - 1) + 1)

            botRequiredFigures[numberFigure].requiredSteps[randomClick-1].dispatchEvent(eventMove)
            if(!moveWhite){
                play()
            }
        } else{
            moveWhite = !moveWhite
        }

        return
    }
    figures.forEach(function(item){
        item.setAttribute("onfocus", "step(event.target)") 
        item.tabIndex = 0
        step(item)
        document.querySelectorAll(".possible-move").forEach((item) => {
            item.classList.remove("possible-move")
        })
    })

    if(botRequiredFigures.length > 0){
        randomFigure = Math.round(Math.random() * (botRequiredFigures.length - 1) + 1)
        let choosedFigure = botRequiredFigures[randomFigure-1].figure
        choosedFigure.dispatchEvent(eventFocus)

        let randomClick = Math.round(Math.random() * (botRequiredFigures[randomFigure-1].requiredSteps.length - 1) + 1)

        lastFocus = choosedFigure
        botRequiredFigures[randomFigure-1].requiredSteps[randomClick-1].dispatchEvent(eventMove)
        moved = true
        console.log("X")

    }    else{
        randomFigure = Math.round(Math.random() * (commonSteps.length - 1) + 1)
        let choosedFigure = commonSteps[randomFigure-1].figure

        choosedFigure.dispatchEvent(eventFocus)

        let randomClick = Math.round(Math.random() * (commonSteps[randomFigure-1].PossibleSteps.length - 1) + 1)

        lastFocus = choosedFigure
        commonSteps[randomFigure-1].PossibleSteps[randomClick-1].dispatchEvent(eventMove)
        moved = true
    }

    // if(moved){
    //     botRequiredFigures = []
    //     step(lastFocus)
    //     botRequiredFigures.forEach(item => {
    //         if(item.figure === lastFocus && item.requiredSteps.length > 0){
    //         let eventFocus = new Event("focus", {bubbles: true})
    //         let eventMove = new Event("click", {bubbles: true})

    //         lastFocus.dispatchEvent(eventFocus)

    //         let randomClick = Math.round(Math.random() * (item.requiredSteps.length - 1) + 1)

    //         item.requiredSteps[randomClick-1].dispatchEvent(eventMove)
    //         moved = true
    //         }         else{
    //             moveWhite = !moveWhite
    //             return 
    //         }
            
    //     })
        

        
    //     // if(possibleSteps.length > 0 && ){
    //     //     let randomClick = Math.round(Math.random() * (possibleSteps.length - 1) + 1)
    //     //     possibleSteps[randomClick-1].dispatchEvent(eventMove)

    //     setTimeout(play(),500)
    //    return
    // }
    if(!moveWhite){
        play()
    }
    
}
// , 500)}