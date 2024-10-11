import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private baseUrl = 'http://localhost:3000/api';

  users: any[] = [];
  loading: boolean = true;

  constructor(private serviceApi: ApiService, private router: Router) {}

  ngOnInit(){
    this.serviceApi.getData().subscribe(users => { 
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => {return (user.id == userId) == false});
    this.serviceApi.removeUser(userId);
  }
  
  editUser(userId: number) {
    this.router.navigate([`user/edit/${userId}`]);
  }

  createNewUser() {
    this.router.navigate(['user/new']);
  }
}