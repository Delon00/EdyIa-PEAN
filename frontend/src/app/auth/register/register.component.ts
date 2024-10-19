import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Register } from '../../../interfaces/register';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Correction ici, 'styleUrls' au pluriel
})
export class RegisterComponent implements OnInit {
  isRegisterFormVisible = false; // Renommée pour être plus explicite
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';
  formRegister: FormGroup;
  userregister: Register = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
  };
  
  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private service: BackendService) {
    this.formRegister = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  showRegisterForm() {
    this.isRegisterFormVisible = true; // Utilisation de la nouvelle propriété
  }

  hideRegisterForm() {
    this.isRegisterFormVisible = false;
  }

  onRegister() {
    if (this.formRegister.valid) {
      this.isLoading = true;
      this.userregister = this.formRegister.value;
      this.service.register(this.userregister).subscribe(
        (response: any) => {
          if (response && typeof response === 'object' && response.message) {
            console.log('Inscription réussie', response);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Réponse inattendue', response);
            this.errorMessage = "Réponse inattendue du serveur.";
          }
          this.isLoading = false;
        },
        (error: any) => {
          this.errorMessage = "Échec de l'inscription. Veuillez vérifier vos informations.";
          console.error('Erreur d\'inscription', error);
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = "Veuillez remplir correctement le formulaire.";
    }
  }
  
}
