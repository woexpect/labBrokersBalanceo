var stompClient = null;

function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        
        stompClient.subscribe('/topic/newpoint', function (data) {
            var object = JSON.parse(data.body);
            var canvas = document.getElementById('pizarra');
            var context = canvas.getContext('2d');
            context.beginPath();
            context.arc(object.x, object.y,1,0,2*Math.PI);
            context.stroke();
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


$(document).ready(
        function () {
            connect();
            console.info('connecting to websockets');

            function getMousePos(canvas, evt) {        
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
            }

            var canvas = document.getElementById('pizarra');
            var context = canvas.getContext('2d');

            canvas.addEventListener('mousedown', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            submit(canvas, mousePos.x, mousePos.y, context);
        }, false);

        }
);


function submit(canvas, valX, valY, context){
    stompClient.send("/topic/newpoint", {}, JSON.stringify({x:valX,y:valY}));
}
