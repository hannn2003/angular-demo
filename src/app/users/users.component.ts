import { Component, OnInit } from '@angular/core';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {}
  users: User[] = [];
  isOpenModal = false;
  newUser: User = { username: '', email: '' };

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log('data', data);
      },
      error: (e) => console.log(e),
    });
  }

  openModal() {
    this.isOpenModal = true;
  }

  closeModal() {
    this.isOpenModal = false;
    this.newUser = { username: '', email: '' };
  }

  createNewUser() {
    if (!this.newUser.username || !this.newUser.email) {
      return;
    }
    this.userService.create(this.newUser).subscribe({
      next: (data) => {
        this.users.push(data);
        this.closeModal();
      },
      error: (err) => console.log('Error:', err),
    });
  }
}
