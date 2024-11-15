package com.example.demo.controller;

import com.example.demo.jwt.CustomJwt;
import org.apache.logging.log4j.message.Message;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.MessageFormat;

@RestController
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = {RequestMethod.GET}
)
public class Controller {

    @GetMapping("/hello")
    @PreAuthorize("hasAuthority('ROLE_fullstack-developer)")
    public Message hello(){
        var jwt=(CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        var message = MessageFormat.format(
                "Hello fullStack master {0} {1}, how is it going today?",
                jwt.getFirstName(),jwt.getLastName()
        );
            return new Message(message);
        }

        record Message(String message){};



}
