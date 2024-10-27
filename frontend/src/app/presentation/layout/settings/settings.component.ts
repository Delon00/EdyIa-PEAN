  import { Component, OnInit } from '@angular/core';
  import { CommonModule,Location } from '@angular/common';
  import { NavbarComponent } from '@app/presentation/shared/navbar/navbar.component';
  import { ReactiveFormsModule } from '@angular/forms';
  import { UserService } from '@services/user.service';
  import { RouterModule, Router } from '@angular/router';


  @Component({
    selector: 'app-settings',
    standalone: true,
    imports: [NavbarComponent, CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
  })
  export class SettingsComponent implements OnInit {
    userData: any;
    isAsideOpen: boolean = false;

    constructor(private userService: UserService,private router: Router, private location: Location) {}

    ngOnInit(): void {
      // this.userService.getUser().subscribe({
      //   next: (data) => {
      //     this.userData = data;
      //     console.log('User data:', this.userData);
      //   },
      //   error: (error) => {
      //     console.error('Error fetching user data:', error);
      //   },
      //   complete: () => {
      //     console.log('User data fetching completed');
      //   }
      // });
    }

    asideToggle() {
      this.isAsideOpen = !this.isAsideOpen;
    }

    retour(){this.location.back();}
  }
