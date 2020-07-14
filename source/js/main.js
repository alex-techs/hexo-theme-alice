let clientWidth  = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight
let mousePosX    = 0
let mousePosY    = 0
let xMoveMax     = (clientWidth * 1.1 - clientWidth) / 2
let yMoveMax     = (clientHeight * 1.1 - clientHeight) / 2

$('.banner').css('height' , clientHeight)
$('.banner img')
    .css('height' , clientHeight * 1.1)
    .css('width' , clientWidth * 1.1)
    .css('transform' , `translate(-${xMoveMax}px , -${yMoveMax}px)`)

function moveImage(moveScale , callback)
{
    if (moveScale > 100 && moveScale - 100 > 0 && moveScale - 100 < 1) {
        return callback(moveScale - 100)
    }
}

function mouseMove(x , y)
{
    if (mousePosX === 0 || mousePosY === 0) {
        mousePosX = x
        mousePosY = y
    }

    // 向上
    if (y < mousePosX) {
        moveImage(scale(mousePosY , y) , scale => {
            yMoveMax = yMoveMax + yMoveMax / 300
            $('.banner img').css('transform' , `translate(-${xMoveMax}px , ${yMoveMax}px)`)
        })
    }

    // 向下
    if (y > mousePosY) {
        moveImage(scale(y , mousePosY) , scale => {
            yMoveMax = yMoveMax + yMoveMax / 300
            $('.banner img').css('transform' , `translate(-${xMoveMax}px , -${yMoveMax}px)`)
        })
    }

    // 向左
    if (x < mousePosX) {
        moveImage(scale(mousePosX , x) , scale => {
            xMoveMax = xMoveMax + xMoveMax / 300
            $('.banner img').css('transform' , `translate(${xMoveMax}px , -${yMoveMax}px)`)
        })
    }

    // 向右
    if (x > mousePosX) {
        moveImage(scale(x , mousePosX) , scale => {
            xMoveMax = xMoveMax + xMoveMax / 300
            $('.banner img').css('transform' , `translate(-${xMoveMax}px , -${yMoveMax}px)`)
        })
    }

    mousePosX = x
    mousePosY = y
}

function scale(x , y)
{
    return (x / y) * 100
}

document.onmousemove = function (event) {
    let x   = 0
    let y   = 0
    const e = event || window.event
    if (e.pageX || e.pageY) {
        x = e.pageX
        y = e.pageY
    } else if (e.clientX || e.clientY) {
        x = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft
        y = event.clientY + document.documentElement.scrollTop + document.body.scrollTop
    }

    return mouseMove(x , y)
}
