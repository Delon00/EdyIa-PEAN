import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';
import { Router, RouterModule, RouterLink } from '@angular/router';

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
  user: any = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.backendService.getUser().subscribe({
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


  menuProfile() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  menuProfileResponsive() {
    this.isProfileMenuOpenResponsive = !this.isProfileMenuOpenResponsive;
  }

  logout() {
    this.backendService.logout();
    this.router.navigate(['/']);
  }
}
