import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@app/presentation/shared/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  userData: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.userData = data;
        console.log('User data:', this.userData);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
      complete: () => {
        console.log('User data fetching completed');
      }
    });
  }
}
