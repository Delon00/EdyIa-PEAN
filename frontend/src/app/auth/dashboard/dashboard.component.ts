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
  user: User | null = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    const userData = this.backendService.getUserData();
    if (userData) {
      this.user = userData;
    } else {
      console.error("Aucun utilisateur trouvé dans le stockage local");
    }
  }

  menuProfile() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.backendService.logout();
    this.router.navigate(['/']);
  }
  
}
