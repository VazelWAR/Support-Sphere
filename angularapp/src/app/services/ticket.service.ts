import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public apiUrl='http://localhost:8080';

  constructor(private readonly http:HttpClient) { }

  getAllTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicketById(ticketId:number):Observable<Ticket>{
    return this.http.get<Ticket>(`${this.apiUrl}/${ticketId}`);
  }

  // https://ide-edfabfeacacebfcdbfeeffbabcfdecbeccfa.premiumproject.examly.io/proxy/8080/

  addTicket(ticket:Ticket):Observable<Ticket>{
    
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  updateTicket(ticketId:number,ticket:Ticket):Observable<Ticket>{

    return this.http.put<Ticket>(`${this.apiUrl}/${ticketId}`, ticket);
  }

  deleteTicket(ticketId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${ticketId}`);
  }

  getTicketsByAgentId(agentId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/agent/${agentId}`);
  }

  getTicketsByUserId(userId:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}

