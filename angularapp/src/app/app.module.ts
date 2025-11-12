import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientViewTicketsComponent } from './components/client-view-tickets/client-view-tickets.component';
import { ClientnavComponent } from './components/clientnav/clientnav.component';
import { ClientpostfeedbackComponent } from './components/clientpostfeedback/clientpostfeedback.component';
import { ClientviewfeedbackComponent } from './components/clientviewfeedback/clientviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerViewAgentsComponent } from './components/manager-view-agents/manager-view-agents.component';
import { ManagerViewTicketsComponent } from './components/manager-view-tickets/manager-view-tickets.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupportAgentManagementComponent } from './components/support-agent-management/support-agent-management.component';
import { SupportedAgentsComponent } from './components/supported-agents/supported-agents.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';
import { AuthIntercepter } from './services/auth.interceptor';
 
@NgModule({
  declarations: [
    AppComponent,
    ClientViewTicketsComponent,
    ClientnavComponent,
    ClientpostfeedbackComponent,
    ClientviewfeedbackComponent,
    ErrorComponent,
    HomePageComponent,
    LoginComponent,
    ManagerDashboardComponent,
    ManagerViewAgentsComponent,
    ManagerViewTicketsComponent,
    ManagernavComponent,
    ManagerviewfeedbackComponent,
    SignupComponent,
    SupportAgentManagementComponent,
    SupportedAgentsComponent,
    TicketDetailsComponent,
    TicketManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthIntercepter,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
 