var stompClient = null;

function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        
        stompClient.subscribe('/topic/newpoint', function (data) {
           alert("Evento recibido ---> " + data);
           var object = JSON.parse(data.body);
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

        }
);


function submit(){
    var valX = document.getElementById("valueX").value
    var valY = document.getElementById("valueY").value
    stompClient.send("/topic/newpoint", {}, JSON.stringify({x:valX,y:valY}));
}