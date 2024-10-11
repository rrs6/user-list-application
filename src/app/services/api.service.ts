import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "http://localhost:3000/api";
  constructor(private http: HttpClient, private router: Router) {}

  getData(){
      const users = this.http.get<any>(`${this.baseUrl}/user`);
      return users;
  }

  removeUser(id: number) {
    this.http.delete(`${this.baseUrl}/user/${id}`).subscribe();
  }

  getClasses() {
    const classes = this.http.get(`${this.baseUrl}/class`);
    return classes;
  }

  getUserInfo(id: number) {
    const user = this.http.get(`${this.baseUrl}/user/${id}`);
    return user;
  }

  editUserInfo(id: number, name?: string, email?: string, classId?: number) {
    this.http.put(`${this.baseUrl}/user/${id}`, {name, email, classId}).subscribe();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  createUser(name: string, email: string, classId: number) {
    this.http.post(`${this.baseUrl}/user/new`, {name, email, classId}).subscribe();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
