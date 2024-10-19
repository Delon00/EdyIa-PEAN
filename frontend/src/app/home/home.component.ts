import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../interfaces/login';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';

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

  constructor(private router: Router, private fb: FormBuilder, private service: BackendService) {
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
      this.service.login(this.userlogin).subscribe(
        (response: any) => {
          this.service.saveUserData(response.token, response.user);
          console.log(response.user);
          console.log(response.token);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        (error: any) => {
          this.errorMessage = "Échec de la connexion. Veuillez vérifier vos informations.";
          console.error('Erreur de connexion', error);
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
