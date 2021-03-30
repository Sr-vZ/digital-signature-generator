// globals
create_template = document.getElementById('create_signature_template')
draw_template = document.getElementById('draw_signature_template')
type_template = document.getElementById('type_signature_template')
main_template = document.getElementById('main_template')
current_window = main_template
previous_window = main_template
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
    current_window = main_template
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

    document.getElementById('create_btn_save').addEventListener('click', function () {
        create_btn_save()
    })
}



function hideAll() {
    create_template.style.display = "none"
    draw_template.style.display = "none"
    type_template.style.display = "none"
}

function main_btn_add_click() {
    main_template.style.display = "none"
    create_template.style.display = "block"
    current_window = create_template
    previous_window = main_template
}

function draw_btn_signature_click() {
    create_template.style.display = "none"
    draw_template.style.display = "block"
    initiate_signaturepad()
    current_window = draw_template
    previous_window = create_template
}

function draw_btn_type_click() {
    create_template.style.display = "none"
    type_template.style.display = "block"
    current_window = type_template
    previous_window = create_template
}

function draw_btn_cancel() {
    draw_template.style.display = "none"
    create_template.style.display = "block"
}

function type_btn_cancel() {
    type_template.style.display = "none"
    create_template.style.display = "block"
}

function create_btn_cancel() {
    show_stored_signatures()
    create_template.style.display = "none"
    main_template.style.display = "block"
}

function create_btn_save() {
    l = signature_datastore.length
    img_data = signature_datastore[l - 1]['sign']
    // download(img_data, 'signature.png')
    img_data = signature_datastore[l - 1]['initial']
    // download(img_data, 'initial.png')
    show_stored_signatures()
    create_template.style.display = "none"
    main_template.style.display = "block"
}

function type_btn_ok() {
    sign_canvas = document.getElementById('type_signature_canvas')
    initial_canvas = document.getElementById('type_initials_canvas')
    if (isCanvasBlank(sign_canvas)) {
        alert('Signature is empty!')
        return 0
    }
    if (isCanvasBlank(initial_canvas)) {
        alert('initials is empty!')
        return 0
    }
    temp = {
        "id": entries,
        "preview_sign": sign_canvas.toDataURL(),
        "preview_initial": initial_canvas.toDataURL(),
        "sign": resizeCanvas('type_signature_canvas', 100, 50),
        "initial": resizeCanvas('type_initials_canvas', 50, 50)
    }

    signature_datastore = []
    signature_datastore.push(temp)
    entries++
    l = signature_datastore.length
    previewImage('preview_sign', signature_datastore[l - 1]['preview_sign'])
    previewImage('preview_initial', signature_datastore[l - 1]['preview_initial'])
    type_template.style.display = "none"
    create_template.style.display = "block"
}

function ts_inp_sign_change() {
    text_content = document.getElementById('ts_inp_sign').value
    canvasWrite('type_signature_canvas', text_content)
}

function ts_inp_initial_change() {
    text_content = document.getElementById('ts_inp_initial').value
    canvasWrite('type_initials_canvas', text_content)
}

function initiate_signaturepad() {
    var sign_canvas = document.getElementById('draw_signature_canvas')
    var initial_canvas = document.getElementById('draw_initial_canvas')

    var sign_signaturePad = new SignaturePad(sign_canvas)
    var initial_signaturePad = new SignaturePad(initial_canvas)
    fixAspectCanvas(sign_canvas, sign_signaturePad)
    fixAspectCanvas(initial_canvas, initial_signaturePad)
    // return [sign_signaturePad,initial_signaturePad]
    // document.addEventListener('')
    document.getElementById('draw_btn_ok').addEventListener('click', function () {
        // create_btn_save()
        if (isCanvasBlank(sign_canvas)) {
            alert('Signature is empty!')
            return 0
        }
        if (isCanvasBlank(initial_canvas)) {
            alert('Signature is empty!')
            return 0
        }
        signature_datastore = []
        temp = {
            "id": entries,
            "preview_sign": sign_canvas.toDataURL(),
            "preview_initial": initial_canvas.toDataURL(),
            "sign": resizeCanvas('draw_signature_canvas', 100, 50),
            "initial": resizeCanvas('draw_initial_canvas', 50, 50)
        }
        signature_datastore.push(temp)
        entries++
        l = signature_datastore.length
        previewImage('preview_sign', signature_datastore[l - 1]['preview_sign'])
        previewImage('preview_initial', signature_datastore[l - 1]['preview_initial'])
        draw_template.style.display = "none"
        create_template.style.display = "block"
    })
}

function canvasWrite(canvas_id, content) {
    var canvas = document.getElementById(canvas_id)
    var ctx = canvas.getContext('2d')
    textLength = content.length
    // console.log(textLength)
    fontSize = Math.ceil(50 / Math.ceil(textLength / 10))
    // ctx.font = fontSize + 'px Cedarville Cursive'
    ctx.font = fontSize + 'px ' + document.getElementById('fontSelctor').value
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
    resizedContext.fillStyle = 'white';
    resizedContext.fillRect(0, 0, width, height);
    resizedContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
    // var ResizedData = resizedCanvas.toDataURL('image/jpeg');
    var ResizedData = resizedCanvas.toDataURL("image/png");
    // console.log(ResizedData)
    return ResizedData

}

function previewImage(canvas_id, img_data) {
    var myCanvas = document.getElementById(canvas_id);
    var ctx = myCanvas.getContext('2d');
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
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
            // <button class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Copy Signature</button>
            // <button>Copy initial</button>
            div.innerHTML = '<img id="copy_sign" src="' + signature_datastore[i].sign + '"></img><button onclick="copy_sign()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Copy Signature</button><img id="copy_initial" src="' + signature_datastore[i].initial + '"></img><button onclick="copy_initial()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Copy Initial</button>'
            document.getElementById('sign_store').appendChild(div)
        }
    }
}

function download(dataURL, filename) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
        window.open(dataURL);
    } else {
        var blob = dataURLtoBlob(dataURL);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    }
}

async function download2(dataURL) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
        window.open(dataURL);
    } else {
        var blob = dataURLtoBlob(dataURL);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        // a.download = filename;

        document.body.appendChild(a);
        // a.click();
        console.log(url)

        window.URL.revokeObjectURL(url);
        // image = await fetch(url)
        // blob = await image.blob()

        await navigator.clipboard.write([
            new ClipboardItem({
                ['image/png']: blob
            })
        ])
    }
}

function dataURLtoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {
        type: mimeString
    });
    return blob;

}

function fixAspectCanvas(canvas) {
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    //signpad.clear(); // otherwise isEmpty() might return incorrect value
}

async function copy_sign() {
    var copyObj = document.getElementById('copy_sign')
    var blob = dataURLtoBlob(copyObj.src)
    // download2(copyObj.src)
    await navigator.clipboard.write([
        new ClipboardItem({
            ['image/png']: blob
        })
    ])
}

async function copy_initial() {
    var copyObj = document.getElementById('copy_initial')
    var blob = dataURLtoBlob(copyObj.src)
    // download2(copyObj.src)
    await navigator.clipboard.write([
        new ClipboardItem({
            ['image/png']: blob
        })
    ])
}