import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';
import { ClientViewTicketsComponent } from './components/client-view-tickets/client-view-tickets.component';
import { SupportedAgentsComponent } from './components/supported-agents/supported-agents.component';
import { ClientpostfeedbackComponent } from './components/clientpostfeedback/clientpostfeedback.component';
import { ClientviewfeedbackComponent } from './components/clientviewfeedback/clientviewfeedback.component';
import { SupportAgentManagementComponent } from './components/support-agent-management/support-agent-management.component';
import { ManagerViewAgentsComponent } from './components/manager-view-agents/manager-view-agents.component';
import { ManagerViewTicketsComponent } from './components/manager-view-tickets/manager-view-tickets.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { AuthGuard } from './components/authguard/auth.guard';
 
const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {path:"home",component:HomePageComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:SignupComponent},
  {path:"add-ticket",component:TicketManagementComponent,canActivate: [AuthGuard], data: { role: 'Client' }},
  {path:"view-tickets-client",component:ClientViewTicketsComponent,canActivate: [AuthGuard], data: { role: 'Client' }},
  {path:"client-edit-ticket/:ticketId",component:TicketManagementComponent,canActivate: [AuthGuard], data: { role: 'Client' }},
  {path:"view-agents-client",component:SupportedAgentsComponent,canActivate: [AuthGuard], data: { role: 'Client' }},
  // {path:"view-agents-client",component:SupportedAgentsComponent},
  {path:"post-feedback/:ticketId/:agentId",component:ClientpostfeedbackComponent,canActivate: [AuthGuard], data: { role: 'Client' }},
  {path:"view-feedbacks-client",component:ClientviewfeedbackComponent,canActivate: [AuthGuard], data: { role: 'Client' }},
  {path:"add-agent",component:SupportAgentManagementComponent,canActivate: [AuthGuard], data: { role: 'Manager' }},
  {path:"view-agents-manager",component:ManagerViewAgentsComponent,canActivate: [AuthGuard], data: { role: 'Manager' }},
  {path:"edit-agent/:agentId",component:SupportAgentManagementComponent,canActivate: [AuthGuard], data: { role: 'Manager' }},
  {path:"view-tickets-manager",component:ManagerViewTicketsComponent,canActivate: [AuthGuard], data: { role: 'Manager' }},
  {path:"dashboard-manager",component:ManagerDashboardComponent,canActivate: [AuthGuard], data: { role: 'Manager' }},
  {path:"view-feedbacks-manager",component:ManagerviewfeedbackComponent,canActivate: [AuthGuard], data: { role: 'Manager' }},
  {path:"error",component:ErrorComponent},
  {path:"ticket-details/:id",component:TicketDetailsComponent,canActivate: [AuthGuard], data: { role: 'Client' }},
  { path: '**', redirectTo: '/home' }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }