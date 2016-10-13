/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.msgbroker;

import edu.eci.arsw.msgbroker.model.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Johan Sebastian Peña Peñaloza
 */
@Controller
public class STOMPMessagesHandler {

    Point[] pointArray = new Point[4];
    int points = 0;
    @Autowired
    SimpMessagingTemplate msgt;

    @MessageMapping("/newpoint")    
    public void getLine(Point pt) throws Exception {
        System.out.println("Nuevo punto recibido en el servidor!:"+pt);
        msgt.convertAndSend("/topic/newpoint", pt);
        
        if(points < 3){
            pointArray[points] = pt;
            points += 1;
        }else{
            pointArray[points] = pt;
            points = 0;
            msgt.convertAndSend("/topic/newpolygon", pointArray);
        }
    }
    //newpolygon
}