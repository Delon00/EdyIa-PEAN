import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from '../services/auth.guard';
import { homeGuard } from '../services/home.guard';
import { registerGuard } from '../services/register.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [homeGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [registerGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

    {path: '**', component: NotFoundComponent}
];
