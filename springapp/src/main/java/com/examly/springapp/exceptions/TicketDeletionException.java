package com.examly.springapp.exceptions;

public class TicketDeletionException extends RuntimeException{
   public TicketDeletionException(String message){
    super(message);
   }
}
