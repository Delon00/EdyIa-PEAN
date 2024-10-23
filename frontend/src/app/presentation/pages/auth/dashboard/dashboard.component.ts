import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, RouterModule, RouterLink]
})
export class DashboardComponent implements OnInit {
  isProfileMenuOpen: boolean = false;
  isProfileMenuOpenResponsive: boolean = false;
  isMenuModuleOpen: boolean = false;
  user: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        if (data && data.user) {
          this.user = data.user;
          console.log('Utilisateur récupéré:', this.user);
        } else {
          console.error("Aucune donnée d'utilisateur reçue.");
        }
      },
      error: (err) => {
        this.userService.logout();
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
      }
    });
  }


  menuProfile() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  menuModule() {
    this.isMenuModuleOpen = !this.isMenuModuleOpen;
  }

  menuProfileResponsive() {
    this.isProfileMenuOpenResponsive = !this.isProfileMenuOpenResponsive;
  }

  logout() {this.userService.logout();}
}