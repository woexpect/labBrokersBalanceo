#### Escuela Colombiana de Ingeniería
#### Procesos de desarrollo de software - PDSW
#### Laboratorio - Broker de Mensajes STOMP con WebSockets + HTML5 Canvas.


Este ejercicio se basa en la documentación oficial de SprinbBoot, para el [manejo de WebSockets con STOMP](https://spring.io/guides/gs/messaging-stomp-websocket/)



![](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/images/message-flow-simple-broker.png)

msgt.convertAndSend("/topic/newpoint", pt);


1. Modifique la página index.html para que permita capturar una coordenada (un campo para x y otro para y).

2. Implemente una función que reciba dos coordenadas, y que con las mismas:
	1. Cree un objeto JSON con dos propiedades: x e y, asociándoles los valores capturados en la interfaz.
	2. Con el objeto stompClient creado en app.js, envíe a manera de mensaje dicho objeto 
	
	
	
	stompClient.send("/app/newpoint", {}, JSON.stringify({x:10,y:10}));
	
	
	
	
	
	Eventos de mouse [ejemplo](http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/), cambiando mousemove por mousedown
	
	
	
	
	Soporte de mouse y touch [ejemplo](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/HTML-canvas-guide/AddingMouseandTouchControlstoCanvas/AddingMouseandTouchControlstoCanvas.html)
	
	
	
	
	
	
	
	
	@Controller
public class STOMPMessagesBroker {

    @Autowired
    SimpMessagingTemplate msgt;
    
    @MessageMapping("/newpoint")    
    public void getLine(Point pt) throws Exception {
        System.out.println("got new point");
        msgt.convertAndSend("/topic/newpoint", pt);
    }

    
}



Objetos recibidos por los suscriptores:

JSON.parse(point.body);