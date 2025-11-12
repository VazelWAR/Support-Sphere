import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportAgent } from '../models/support-agent.model';

@Injectable({
  providedIn: 'root'
})
export class SupportAgentService {

  constructor(private readonly http: HttpClient) { }

  baseUrl="http://localhost:8080";

  getAllAgents():Observable<SupportAgent[]>{
    return this.http.get<SupportAgent[]>(this.baseUrl);
  }

  getAgentById(agentId:number):Observable<SupportAgent>{
    return this.http.get<SupportAgent>(`${this.baseUrl}/${agentId}`);
  }

  addAgent(agent:SupportAgent):Observable<SupportAgent>{
    return this.http.post<SupportAgent>(this.baseUrl,agent);
  }

  updateAgent(agentId:number, agent:SupportAgent):Observable<SupportAgent>{
    return this.http.put<SupportAgent>(`${this.baseUrl}/${agentId}`,agent);
  }

  deleteAgent(agentId:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${agentId}`);
  }
}
