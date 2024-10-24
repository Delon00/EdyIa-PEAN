import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Register } from '@interfaces/register';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { UserService } from '@services/user.service';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isRegisterFormVisible = false;
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

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private localServices: LocalStorageService) {
    this.formRegister = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  showRegisterForm() {
    this.isRegisterFormVisible = true;
  }

  hideRegisterForm() {
    this.isRegisterFormVisible = false;
  }

  onRegister() {
    if (this.formRegister.valid) {
      this.isLoading = true;
      this.userregister = this.formRegister.value;
      this.userService.register(this.userregister).subscribe(
        (response: any) => {
          if (response && response.message === 'Utilisateur créé avec succès') {
            this.localServices.createToken(response.token)
            this.userService.saveUserData(response.user);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Réponse inattendue', response);
            this.errorMessage = response.message || "Réponse inattendue du serveur.";
          }
          this.isLoading = false;
        },
        (error: any) => {
          if (error.status === 400) {
            this.errorMessage = error.error.message || "Échec de l'inscription. Veuillez vérifier vos informations.";
          } else {
            this.errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
          }
          console.error('Erreur d\'inscription', error);
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = "Veuillez remplir correctement le formulaire.";
    }
  }

}
