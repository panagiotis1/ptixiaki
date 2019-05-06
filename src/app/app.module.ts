import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomePageComponent } from './home-page/home-page.component';
import { PodosfairoComponent } from './podosfairo/podosfairo.component';
import { BasketComponent } from './basket/basket.component';
import { AdminComponent } from './admin/admin.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { CreateArticleComponent } from './create-article/create-article.component';
import { SearchArticleComponent } from './search-article/search-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { TableComponent } from './table/table.component';

import { SearchUserComponent } from './search-user/search-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TableUserComponent } from './table-user/table-user.component';

import { AlertsComponent } from './alerts/alerts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { TokenInterceptorService } from './token-interceptor.service';
import { AuthService } from './auth.service';
import { EventsService } from './events.service';
import { CommunicatorService } from './communicator.service';
import { AuthGuard } from './auth.guard';
import { ForbiddenValidatorDirective } from './forbidden-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PodosfairoComponent,
    BasketComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    CreateArticleComponent,
    SearchArticleComponent,
    TableComponent,
    EditArticleComponent,
    SearchUserComponent,
    TableUserComponent,
    EditUserComponent,
    AlertsComponent,
    ForbiddenValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, EventsService, CommunicatorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
