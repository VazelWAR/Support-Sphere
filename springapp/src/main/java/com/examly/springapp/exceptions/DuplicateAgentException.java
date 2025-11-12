package com.examly.springapp.exceptions;

public class DuplicateAgentException extends RuntimeException {
   public DuplicateAgentException(String message){
    super(message);
   }
}
