import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '@app/presentation/shared/loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,LoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userData: any;
  isModify:boolean = false;
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.userData = data;
        console.log('User data:', this.userData);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.userService.logout();
      },
      complete: () => {
        console.log('User data fetching completed');
      }
    });
  }

  modify() {
    this.isModify = !this.isModify
  }

}
