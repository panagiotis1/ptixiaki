import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { PodosfairoComponent } from './podosfairo/podosfairo.component';
import { BasketComponent } from './basket/basket.component';
import { AdminComponent } from './admin/admin.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { CreateArticleComponent } from './create-article/create-article.component';
import { SearchArticleComponent } from './search-article/search-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

import { SearchUserComponent } from './search-user/search-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'podosfairo', component: PodosfairoComponent},
  { path: 'basket', component: BasketComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
    			{ path: 'login', component: LoginComponent},
    			{ path: 'register', component: RegisterComponent},
          { path: 'create-article', component: CreateArticleComponent, canActivate: [AuthGuard]},
          { path: 'search-article', component: SearchArticleComponent, canActivate: [AuthGuard]},
          { path: 'edit-article', component: EditArticleComponent, canActivate: [AuthGuard]},
          { path: 'search-user', component: SearchUserComponent, canActivate: [AuthGuard]},
          { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard]},
          { path: '', redirectTo: 'login', pathMatch: 'prefix'},
        ]
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
