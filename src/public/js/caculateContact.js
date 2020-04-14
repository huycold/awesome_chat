function UnAddNumberContact(className){
    let currentValue =+$(`.${className}`).find("em").text()
    currentValue-=1;
    if(currentValue ===0){
        $(`.${className}`).html("");

    }
    else{
        $(`.${className}`).
        html(`(<em>${currentValue}</em>)`)
    }
    console.log(currentValue)
}

function addNumberContact(className){
    let currentValue =+$(`.${className}`).find("em").text()
    currentValue+=1;
    if(currentValue ===0){
        $(`.${className}`).html("");

    }
    else{
        $(`.${className}`).
        html(`(<em>${currentValue}</em>)`)
    }
    console.log(currentValue)
}
function UnAddNumberThongbao(className){
    let currentValue =+$(`.${className}`).find("em").text()
    currentValue-=1;
    if(currentValue ===0){
        $(`.${className}`).css("display","none").html("");

    }
    else{
        $(`.${className}`).css("display","block")
        html(`(<em>${currentValue}</em>)`)
    }
    console.log(currentValue)
}

function addNumberThongbao(className){
    let currentValue =+$(`.${className}`).find("em").text()
    currentValue+=1;
    if(currentValue ===0){
        $(`.${className}`).css("display","none").html("");

    }
    else{
        $(`.${className}`).css("display","block").
        html(`(<em>${currentValue}</em>)`)
    }
    console.log(currentValue)
}