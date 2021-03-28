// globals
create_teamplate = document.getElementById('create_signature_template')
draw_teamplate = document.getElementById('draw_signature_template')
type_teamplate = document.getElementById('type_signature_template')
main_teamplate = document.getElementById('main_template')
current_window = main_teamplate
previous_window = main_teamplate
signature_datastore = []
entries = 1
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

    document.getElementById('ts_inp_sign').addEventListener('keyup', function () {
        ts_inp_sign_change()
    })

    document.getElementById('ts_inp_initial').addEventListener('keyup', function () {
        ts_inp_initial_change()
    })

    document.getElementById('type_btn_ok').addEventListener('click', function () {
        type_btn_ok()
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
    show_stored_signatures()
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
    temp = {
        "id": entries,
        "sign": resizeCanvas('type_signature_canvas', 100, 50),
        "initial": resizeCanvas('type_initials_canvas', 50, 50)
    }
    signature_datastore.push(temp)
    entries++
    l = signature_datastore.length
    previewImage('preview_sign', signature_datastore[l - 1]['sign'])
    previewImage('preview_initial', signature_datastore[l - 1]['initial'])
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

    resizedContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
    var ResizedData = resizedCanvas.toDataURL();
    console.log(ResizedData)
    return ResizedData

}

function previewImage(canvas_id, img_data) {
    var myCanvas = document.getElementById(canvas_id);
    var ctx = myCanvas.getContext('2d');
    var img = new Image;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, myCanvas.width, myCanvas.height); // Or at whatever offset you like
    };
    img.src = img_data;
}

function show_stored_signatures() {
    if (signature_datastore.length > 0) {
        document.getElementById('sign_store').innerHTML = ""
        for (i = 0; i < signature_datastore.length; i++) {
            var div = document.createElement('div')
            div.className = 'flex py-2 px-12 gap-4 border-2 rounded-md'
            // <div class="border-3"></div>
            div.innerHTML = '<div class="border-3"><p>'+signature_datastore[i].id+'</p></div> <img  src="' + signature_datastore[i].sign + '"></img><img class="border-3" src="' + signature_datastore[i].initial + '"></img>'
            document.getElementById('sign_store').appendChild(div)
        }
    }
}