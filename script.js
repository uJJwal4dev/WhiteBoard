const canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')
let isDrawing = false

window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

const startDraw = () =>{
    isDrawing = true;
    ctx.beginPath()
}
const startErase = () => {
    isDrawing = true;
    ctx.beginPath()
    ctx.lineWidth = 50
    ctx.strokeStyle = 'white'
}

const drawing = (e) => {
    if(!isDrawing) return
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}

canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);

let tol = document.querySelectorAll('.tl')

tol.forEach( i => i.addEventListener('click', (e) => {
        tol.forEach(i => {
            i.style.boxShadow = '';
            i.style.transform = '';
        })
        canvas.removeEventListener('mousedown', startDraw);
        canvas.removeEventListener('mousedown', startErase);
        i.style.boxShadow = `0 0 10px green`;
        i.style.transform = 'scale(1.3)';
        if(i.classList.contains('pen')){
            canvas.addEventListener('mousedown', startDraw);
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 3
        }else if(i.classList.contains('eraser')){
            canvas.addEventListener('mousedown', startErase);
        }else{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            i.style.boxShadow = '';
            i.style.transform = '';
        }
}))

const pen = document.querySelector('.pen')
const prp = document.querySelector('.abv')

pen.addEventListener('dblclick', e => {
    prp.classList.toggle('disp')
})

const inp = document.querySelectorAll('.inp')
inp.forEach(i => {
    i.addEventListener('blur', e =>{
        prp.classList.toggle('disp')
        if(i.classList.contains('clrbx')){
            ctx.strokeStyle = i.value
        }
    })
})

const clr = document.querySelectorAll('.clr')
clr.forEach(i => {
    i.addEventListener('click', e =>{
        ctx.strokeStyle = i.dataset.colour
        prp.classList.toggle('disp')

    })
})

let psz = document.querySelector('.psiz')
psz.addEventListener('change', e => {
    ctx.lineWidth = psz.value
})
