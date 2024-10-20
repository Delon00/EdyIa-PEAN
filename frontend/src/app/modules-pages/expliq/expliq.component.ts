import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expliq',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expliq.component.html',
  styleUrl: './expliq.component.scss'
})
export class ExpliqComponent implements OnInit {
  formExpliq: FormGroup;
  expliq: any = {};
  isProfileMenuOpenResponsive: boolean = false;
  isMenuModuleOpen: boolean = false;
  user: any = null;

  constructor(private backendService: BackendService, private fb: FormBuilder) {
    this.formExpliq = this.fb.group({
      context: [''],
      question: ['']
    });
  }

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



  menuModule() {
    this.isMenuModuleOpen = !this.isMenuModuleOpen;
  }

  menuProfileResponsive() {
    this.isProfileMenuOpenResponsive = !this.isProfileMenuOpenResponsive;
  }

  onSubmit() {
    const { context, question } = this.formExpliq.value;
    console.log('Données du formulaire:', { context, question });
    this.backendService.generateExpliq(context, question).subscribe(
      response => {
        this.expliq = response.expliq; 
        console.log('Réponse du serveur:', response);
      },
      error => {
        console.error('Erreur lors de la génération de l\'expliquation:', error);
        alert('Erreur lors de la génération de l\'expliquation. Veuillez réessayer.');
      }
    );
  }
}
