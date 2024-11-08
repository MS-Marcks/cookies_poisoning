import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient = inject(HttpClient);
  URL_BASE: string = "http://localhost:3000/v1/";
  constructor() { }

  async login(request: any): Promise<any> {
    return this.httpClient.post<any>(this.URL_BASE + "login", request, {
      withCredentials: true // Permite que la solicitud incluya cookies
    }).toPromise();
  }
}
