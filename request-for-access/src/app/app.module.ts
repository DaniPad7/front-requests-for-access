import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationServiceService } from './services/authentication-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { TicketService } from './services/ticket.service';
import { DataService } from './services/data.service';
import { ViewRequestComponent } from './components/view-request/view-request.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CreateRequestComponent,
    ViewRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationServiceService,
  UserService,
  TicketService,
  DataService,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],/**implement jwt */
  bootstrap: [AppComponent]
})
export class AppModule { }
