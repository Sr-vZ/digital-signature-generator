// globals
create_teamplate = document.getElementById('create_signature_template')
draw_teamplate = document.getElementById('draw_signature_template')
type_teamplate = document.getElementById('type_signature_template')
main_teamplate = document.getElementById('main_template')
current_window = main_teamplate
previous_window = main_teamplate

document.addEventListener('DOMContentLoaded', function () {
    // do something
    init()
    // console.log('body loaded!')
})

function init() {
    console.log('body loaded!')
    hideAll()
    current_window = main_teamplate
    document.getElementById('main_btn_add').addEventListener('click', function () {
        main_btn_add_click()
    })

    document.getElementById('draw_btn_signature').addEventListener('click', function () {
        draw_btn_signature_click()
    })

    document.getElementById('draw_btn_type').addEventListener('click', function () {
        draw_btn_type_click()
    })

    document.getElementById('create_btn_cancel').addEventListener('click', function () {
        create_btn_cancel()
    })

    document.getElementById('draw_btn_cancel').addEventListener('click', function () {
        draw_btn_cancel()
    })

    document.getElementById('type_btn_cancel').addEventListener('click', function () {
        type_btn_cancel()
    })

    document.getElementById('type_btn_cancel').addEventListener('click', function () {
        type_btn_cancel()
    })

    document.getElementById('ts_inp_sign').addEventListener('change', function () {
        ts_inp_sign_change()
    })

    document.getElementById('ts_inp_initial').addEventListener('change', function () {
        ts_inp_initial_change()
    })

}



function hideAll() {
    create_teamplate.style.display = "none"
    draw_teamplate.style.display = "none"
    type_teamplate.style.display = "none"
}

function main_btn_add_click() {
    main_teamplate.style.display = "none"
    create_teamplate.style.display = "block"
    current_window = create_teamplate
    previous_window = main_teamplate
}

function draw_btn_signature_click() {
    create_teamplate.style.display = "none"
    draw_teamplate.style.display = "block"
    current_window = draw_teamplate
    previous_window = create_teamplate
}

function draw_btn_type_click() {
    create_teamplate.style.display = "none"
    type_teamplate.style.display = "block"
    current_window = type_teamplate
    previous_window = create_teamplate
}

function draw_btn_cancel() {
    draw_teamplate.style.display = "none"
    create_teamplate.style.display = "block"
}

function type_btn_cancel() {
    type_teamplate.style.display = "none"
    create_teamplate.style.display = "block"
}

function create_btn_cancel() {
    create_teamplate.style.display = "none"
    main_teamplate.style.display = "block"
}

function type_btn_ok() {
    sign_canvas = document.getElementById('type_signature_canvas')
    initial_canvas = document.getElementById('type_initials_canvas')
    if (isCanvasBlank(sign_canvas)) {
        alert('Signature is empty!')
    }
    if (isCanvasBlank(initial_canvas)) {
        alert('initials is empty!')
    }
    sign_canvas.toDataURL
    type_teamplate.style.display = "none"
    create_teamplate.style.display = "block"

}

function ts_inp_sign_change() {
    text_content = document.getElementById('ts_inp_sign').value
    canvasWrite('type_signature_canvas', text_content)
}

function ts_inp_initial_change() {
    text_content = document.getElementById('ts_inp_initial').value
    canvasWrite('type_initials_canvas', text_content)
}

function canvasWrite(canvas_id, content) {
    var canvas = document.getElementById(canvas_id)
    var ctx = canvas.getContext('2d')
    textLength = content.length
    // console.log(textLength)
    fontSize = Math.ceil(50 / Math.ceil(textLength / 10))
    ctx.font = fontSize + 'px Cedarville Cursive'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.textBaseline = 'top';
    ctx.textAlign = "center";
    ctx.fillText(content, canvas.width / 2, canvas.height / 2)

    //wrapText(ctx, content, 0, 0, canvas.width, 50, 'Cedarville Cursive', )
}

function clearCanvas(canvas_id) {
    var canvas = document.getElementById(canvas_id)
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function isCanvasBlank(canvas) {
    return !canvas.getContext('2d')
        .getImageData(0, 0, canvas.width, canvas.height).data
        .some(channel => channel !== 0);
}

function resizeCanvas(oldCanvas_id, width, height) {
    var canvas = document.getElementById(oldCanvas_id)
    var ctx = canvas.getContext('2d')

    var resizedCanvas = document.createElement("canvas");
    var resizedContext = resizedCanvas.getContext("2d");

    resizedCanvas.height = height;
    resizedCanvas.width = width;
}