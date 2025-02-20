import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  validateUsername(username: string): Observable<boolean> {
    console.log(`Triggered validateUsername: ${username}`);
    let exitsUsers = ['HaAlpaca', 'HaLacDa', 'Hello', 'World'];
    let isValid = exitsUsers.every((user) => user !== username);
    return of(isValid).pipe(delay(1000));
  }
}
