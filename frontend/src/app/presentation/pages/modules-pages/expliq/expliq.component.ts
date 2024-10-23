//src/app/expliq.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@app/core/services/user.service';
import { BaseService } from '@app/core/services/base.service';
import { NavbarComponent } from "@shared/navbar/navbar.component";

@Component({
  selector: 'app-expliq',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './expliq.component.html',
  styleUrl: './expliq.component.scss'
})
export class ExpliqComponent {
  formExpliq: FormGroup;
  expliq: any = {};



  constructor(private baseService:BaseService, private fb: FormBuilder) {
    this.formExpliq = this.fb.group({
      context: [''],
      question: ['']
    });
  }

  onSubmit() {
    const { context, question } = this.formExpliq.value;
    console.log('Données du formulaire:', { context, question });
    this.baseService.generateExpliq(context, question).subscribe(
      response => {
        this.expliq = response.expliq; 
        console.log('Réponse du serveur:', response);
      },
      error => {
        console.error('Erreur lors de la génération de l\'expliquation:', error);
        if (error.error && error.error.error === 'Nombre insuffisant de jetons.') {
          alert('Erreur: Nombre insuffisant de jetons. Veuillez recharger vos jetons.');
        } else {
          alert('Erreur lors de la génération de l\'explication. Veuillez réessayer.');
        }
      }
    );
  }
}
