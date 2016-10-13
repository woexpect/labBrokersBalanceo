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

        stompClient.subscribe('/topic/newpolygon', function (data) {
            var object = JSON.parse(data.body);
            var canvas = document.getElementById('pizarra');
            var context = canvas.getContext('2d');
            context.beginPath();
            context.fillStyle = '#f00';
            context.moveTo(object[0].x,object[0].y);
            context.lineTo(object[1].x,object[1].y);
            context.lineTo(object[2].x,object[2].y);
            context.lineTo(object[3].x,object[3].y);
            context.closePath();
            context.fill();
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
    stompClient.send("/app/newpoint", {}, JSON.stringify({x:valX,y:valY}));
}
