
let whoPlay = document.getElementById("whoPlay")
let observer = new MutationObserver (play);

function start(event){
    observer.observe(whoPlay,{
        childList: true,
        subtree:true,
        characterData: true,
    })
    play()
}


function play(figure){
    setTimeout(function(){
    if(moveWhite){
        return
    }
    commonSteps = []
    commonRequiredSteps = []
    botRequiredFigures = []
    let randomFigure
    let eventFocus = new Event("focus", {bubbles: true})
    let eventMove = new Event("click", {bubbles: true})

    let figures = document.querySelectorAll(`.figureB`)

    if(moved){
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

            setTimeout(()=> {
                botRequiredFigures[numberFigure].requiredSteps[randomClick-1].dispatchEvent(eventMove);
                if(!moveWhite){
                    play()
                }
            }, 700)

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
        setTimeout(()=> { botRequiredFigures[randomFigure-1].requiredSteps[randomClick-1].dispatchEvent(eventMove);
            play()
        }, 700)
        moved = true
    }    else{
        randomFigure = Math.round(Math.random() * (commonSteps.length - 1) + 1)
        let choosedFigure = commonSteps[randomFigure-1].figure

        choosedFigure.dispatchEvent(eventFocus)

        let randomClick = Math.round(Math.random() * (commonSteps[randomFigure-1].PossibleSteps.length - 1) + 1)

        lastFocus = choosedFigure
        setTimeout(()=> { commonSteps[randomFigure-1].PossibleSteps[randomClick-1].dispatchEvent(eventMove);     
            play()
        }, 700)
        moved = true
    }

    
}
, 500)}