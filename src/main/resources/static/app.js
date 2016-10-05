var stompClient = null;



/*function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}*/

function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/newpoint', function (greeting) {
           
            addPointToCanvas(greeting);
        });
    });
}

function addPointToCanvas(point){
    var newpoint=JSON.parse(point.body);
     alert("nuevo punto generado:"+newpoint.x);
     
     
     
    var canvas=document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(newpoint.x,newpoint.y,3,0,2*Math.PI);
    ctx.stroke();
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendPoint() {
    stompClient.send("/app/newpoint", {}, JSON.stringify({x:10,y:10}));
}

$(document).ready(
        function () {
            connect();
            console.info('connecting to websockets');

        }
);
