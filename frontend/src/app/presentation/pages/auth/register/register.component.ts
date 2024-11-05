import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormGroup, ReactiveFormsModule, Validators, FormControl, } from '@angular/forms';
import { Register } from '@interfaces/register';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { UserService } from '@services/user.service';
import { LocalStorageService } from '@services/local-storage.service';
import { ConfirmPasswordValidator } from '@app/utils/confirmPasswordValidator';
import { IpService } from '@app/utils/ipAdresseFind';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isRegisterFormVisible = false;
  ipAddress: string = '';
  errorMessage: string = '';
  formRegister: FormGroup;
  userRegister: Register = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private localServices: LocalStorageService,
    private ipService: IpService
  ) {
    this.formRegister = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required]),
    }, { validators: ConfirmPasswordValidator });
  }

  ngOnInit(): void {
    this.ipService.getIpAddress().subscribe(
      (response: any) => {
        this.ipAddress = response.ip;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de l\'adresse IP', error);
      }
    );
  }



  onRegister() {
    if (this.formRegister.valid) {
      this.isLoading = true;
      this.userRegister = this.formRegister.value;

      this.userService.register(this.userRegister).subscribe({
        next: (response: any) => {
          if (response && response.message === 'Utilisateur créé avec succès') {
            this.localServices.createToken(response.token);
            this.userService.saveUserData(response.user);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Réponse inattendue', response);
            this.errorMessage = response.message || "Réponse inattendue du serveur.";
          }
        },
        error: (error: any) => {
          console.log(error.status, error.message)
          if (error.status === 400 && error.message === 'Utilisateur déjà existant.') {
            this.errorMessage = 'Cet email est déjà enregistré. Veuillez utiliser un autre email.';
            this.isLoading = false;
          } else {
            this.errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
            this.isLoading = false;
          }
        },
        complete: () => {this.isLoading = false;}
      });
    } else {
      this.errorMessage = `A quoi tu joues ?? ton adresse ip (${this.ipAddress}) vient d'etre tracé la prochaine fois tu serra banni de l'application. `;
    }
  }
}
