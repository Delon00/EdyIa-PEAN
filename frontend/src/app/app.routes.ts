import { Routes } from '@angular/router';

import { authGuard } from '../services/auth.guard';
import { homeGuard } from '../services/home.guard';
import { registerGuard } from '../services/register.guard';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './modules-pages/quiz/quiz.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [homeGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [registerGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'quiz', component: QuizComponent },


    {path: '**', component: NotFoundComponent}
];
