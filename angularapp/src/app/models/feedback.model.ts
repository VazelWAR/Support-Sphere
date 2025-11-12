export interface Feedback {
    feedbackId?:number;
    feedbackText:string;
    date:Date;
    userId:number;
    agentId?:number;
    ticketId:number;
    category:string;
    rating:number;
}
