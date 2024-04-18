package com.ecommerce.login.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.login.dto.ErrorDto;
import com.ecommerce.login.exceptions.AppException;



@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = { AppException.class })
    @ResponseBody
    public ResponseEntity<ErrorDto> handleException(AppException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(ErrorDto.builder().message(ex.getMessage()).build());
    }
//    public String getData() {
//    	ErrorDto errodto= new ErrorDto("asca");
//    	return "Hello";
//    	
//    }
}