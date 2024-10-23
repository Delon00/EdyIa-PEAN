import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Login } from '@interfaces/login';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { BaseService } from '@services/base.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  LoginForm = false;
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';
  formLogin: FormGroup;
  userlogin: Login = {
    email: '',
    password: '',
  };
  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  showLoginForm() {
    this.LoginForm = true;
  }

  hideLoginForm() {
    this.LoginForm = false;
  }

  onLogin() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      this.userlogin = this.formLogin.value;
      this.userService.login(this.userlogin).subscribe(
        (response: any) => {
          this.userService.saveUserData(response.token, response.user);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        (error: any) => {
          if (error.status === 400) {
            this.errorMessage = error.message;
          } else if (error.status === 401) {
            this.errorMessage = error.message;
          } else if (error.status === 500) {
            this.errorMessage = "Erreur serveur, veuillez réessayer plus tard.";
          } else {
            this.errorMessage = "Échec de la connexion. Veuillez vérifier vos informations.";
            console.log('Erreur inattendue:', error);
          }
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = "Veuillez remplir correctement le formulaire.";
      this.emailError = this.formLogin.get('email')?.errors?.['required'] ? 'Email requis' : '';
      this.passwordError = this.formLogin.get('password')?.errors?.['required'] ? 'Mot de passe requis' : '';
    }
  }
}
