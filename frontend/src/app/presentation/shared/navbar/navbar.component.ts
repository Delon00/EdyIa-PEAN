import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@app/core/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isProfileMenuOpenResponsive: boolean = false;
  isProfileMenuOpen: boolean = false;

  isMenuModuleOpen: boolean = false;
  user: any = null;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        if (data && data.user) {
          this.user = data.user;
        } else {
          console.error("Aucune donnée d'utilisateur reçue.");
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
      }
    });
  }

  menuModule() {
    this.isMenuModuleOpen = !this.isMenuModuleOpen;
  }

  menuProfile() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  menuProfileResponsive() {
    this.isProfileMenuOpenResponsive = !this.isProfileMenuOpenResponsive;
  }
  logout() {this.userService.logout();}
}
