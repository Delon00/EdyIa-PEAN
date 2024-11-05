import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from '@interfaces/login';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { BaseService } from '@services/base.service';
import { UserService } from '@services/user.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';

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
  formLogin!: FormGroup;

  isLoading: boolean = false;

  constructor(private router: Router, private userService: UserService, private localStorage:LocalStorageService) {

  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required,]),
    });
  }
  toggleLoginForm() {this.LoginForm = !this.LoginForm}


  onLogin() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      this.userService.login(this.formLogin.value).subscribe({
        next:(response: any) => {
          this.userService.saveUserData(response.user);
          this.localStorage.createToken(response.token)
          console.log(this.localStorage.getToken())
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        error:(error: any) => {
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
      });
    }
    else {this.errorMessage = "Veuillez remplir correctement le formulaire.";}
  }
}
