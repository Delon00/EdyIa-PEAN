import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isProfileMenuOpenResponsive: boolean = false;
  isMenuModuleOpen: boolean = false;
  user: any = null;

  constructor(private userService: UserService){}

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
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
      }
    });
  }

  menuModule() {
    this.isMenuModuleOpen = !this.isMenuModuleOpen;
  }

  menuProfileResponsive() {
    this.isProfileMenuOpenResponsive = !this.isProfileMenuOpenResponsive;
  }
}
