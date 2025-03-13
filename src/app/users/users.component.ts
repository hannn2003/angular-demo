import { Component, OnInit } from '@angular/core';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: User = { username: '', email: '' };
  isOpenModal = false;
  isEdit = false;
  isView = false;
  isLoadingGlobal: boolean = false;

  constructor(private userService: UsersService) {}

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

  openModal(
    openModal = false,
    openView = false,
    openEdit = false,
    user?: User
  ) {
    this.isOpenModal = openModal;
    this.isEdit = openEdit;
    this.isView = openView;
    this.currentUser = user ? { ...user } : { username: '', email: '' };
  }

  closeModal() {
    this.isOpenModal = false;
    this.currentUser = { username: '', email: '' };
    this.isEdit = false;
  }

  detail(user_id: string) {
    this.userService.getUser(user_id).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.isOpenModal = true;
        this.isEdit = false;
        this.isView = true;
      },
      error: (e) => console.log(e),
    });
  }

  // saveUser() {
  //   if (!this.currentUser?.username || !this.currentUser?.email) return;
  //   if (this.isEdit) {
  //     this.userService
  //       .updateUser(this.currentUser.id, this.currentUser)
  //       .subscribe({
  //         next: () => {
  //           this.getUsers();
  //           this.closeModal();
  //         },
  //         error: (e) => console.log(e),
  //       });
  //   } else {
  //     this.userService.create(this.currentUser).subscribe({
  //       next: () => {
  //         this.getUsers();
  //         this.closeModal();
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  // }

  saveUser() {
    if (!this.currentUser?.username || !this.currentUser?.email) return;

    this.isLoadingGlobal = true;

    const saveObservable = this.isEdit
      ? this.userService.updateUser(this.currentUser.id, this.currentUser)
      : this.userService.create(this.currentUser);

    saveObservable.subscribe({
      next: () => {
        this.getUsers();
        this.isLoadingGlobal = false;
        this.closeModal();
      },
      error: (e) => {
        console.log(e);
        this.isLoadingGlobal = false;
      },
    });
  }

  delete(user_id: string) {
    this.isLoadingGlobal = true;
    this.userService.deleteUser(user_id).subscribe({
      next: () => {
        this.getUsers();
        this.isLoadingGlobal = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoadingGlobal = false;
      },
    });
  }
}
