//src/app/expliq.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@app/core/services/user.service';
import { BaseService } from '@app/core/services/base.service';
import { NavbarComponent } from "@shared/navbar/navbar.component";
import { LoaderComponent } from '@app/presentation/shared/loader/loader.component';
@Component({
  selector: 'app-expliq',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, LoaderComponent],
  templateUrl: './expliq.component.html',
  styleUrl: './expliq.component.scss',
})
export class ExpliqComponent implements OnInit {
  formExpliq: FormGroup;
  expliq: any ;
  errorMessage: string = ""
  user: any = null;
  constructor(private baseService: BaseService, private fb: FormBuilder, private userService: UserService) {
    this.formExpliq = this.fb.group({
      context: [''],
      question: ['']
    });
  }

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



  onSubmit() {
    const { context, question } = this.formExpliq.value;


    this.baseService.generateExpliq(context, question).subscribe(
      (response) => {
        this.expliq = response.expliq;
        console.log('Réponse du serveur:', response);
        console.log(this.expliq?.answer);
      },
      (error) => {
        console.log(error.status)
        if (error.status === 400) {
          this.errorMessage = error.message;
        } else if (error.status === 401) {
          this.errorMessage = error.message;
        } else if (error.status === 500) {
          this.errorMessage = 'Erreur serveur, veuillez réessayer plus tard.';
          console.error('Erreur lors de la génération de l\'explication:', error);
        } else {
          this.errorMessage = 'Erreur lors de la génération de l\'explication. Veuillez réessayer.';
        }
      }
    );
  }
}
