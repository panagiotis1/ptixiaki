import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _basketUrl = "http://localhost:3000/api/basket";
  private _podosfairoUrl = "http://localhost:3000/api/podosfairo";
  private _homePageUrl = "http://localhost:3000/api/home-page";
  private _loginUrl = "http://localhost:3000/api/login";
  private _registerUrl = "http://localhost:3000/api/register";
  private _getCategoriesUrl = "http://localhost:3000/api/get-categories";

  constructor(private http: HttpClient) {}
  homePage(){
    return this.http.get<any>(this._homePageUrl);
  }

  podosfairo(){
    return this.http.get<any>(this._podosfairoUrl);
  }

  basket(){
    return this.http.get<any>(this._basketUrl);
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user);
  }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user);
  }

  getCategories(){
    console.log("this runs");
    return this.http.get<any>(this._getCategoriesUrl);
  }
}
