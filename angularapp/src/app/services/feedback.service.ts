import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public apiUrl="http://localhost:8080";
  constructor(private readonly http:HttpClient) { }
  sendFeedback(feedback:Feedback):Observable<any>{
    const payload = {
      feedbackText:feedback.feedbackText,
      date:feedback.date,
      category:feedback.category,
      rating:feedback.rating,
      user:{userId:feedback.userId},
      supportAgent:{agentId:feedback.agentId},
      ticket:{ticketId:feedback.ticketId}
    };
    return this.http.post<any>(this.apiUrl,payload);
  }
  getFeedbacksByUserId(userId:number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteFeedback(feedbackId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`);
  }

  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.apiUrl);
  }
}
