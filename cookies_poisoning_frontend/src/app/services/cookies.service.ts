import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() { }

  // Método para establecer una cookie
  setCookie(name: string, value: string, days: number = 7, path: string = '/'): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=${path}`;
  }

  // Método para obtener el valor de una cookie por su nombre
  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
  }

  // Método para eliminar una cookie
  deleteCookie(name: string, path: string = '/'): void {
    this.setCookie(name, '', -1, path);
  }

  // Método para verificar si existe una cookie
  checkCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }
}
