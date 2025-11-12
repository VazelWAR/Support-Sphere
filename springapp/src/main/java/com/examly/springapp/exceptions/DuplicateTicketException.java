package com.examly.springapp.exceptions;

public class DuplicateTicketException extends RuntimeException{
   public DuplicateTicketException(String message){
    super(message);
   }
}
