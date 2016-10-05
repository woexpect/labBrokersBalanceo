var stompClient = null;

function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        
        stompClient.subscribe('/topic/newpoint', function (greeting) {
           
            
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

function sendPoint(x,y) {
    stompClient.send("/app/newpoint", {}, JSON.stringify({x:10,y:10}));
}

$(document).ready(
        function () {
            connect();
            console.info('connecting to websockets');

        }
);
