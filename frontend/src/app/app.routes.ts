import { Routes } from '@angular/router';

import { authGuard } from '@guards/auth.guard';
import { homeGuard } from '@guards/home.guard';
import { registerGuard } from '@guards/register.guard';

import { HomeComponent } from '@pages/home/home.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { DashboardComponent } from '@pages/auth/dashboard/dashboard.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { QuizComponent } from '@pages/modules-pages/quiz/quiz.component';
import { ExpliqComponent } from '@pages/modules-pages/expliq/expliq.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [homeGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [registerGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'quiz', component: QuizComponent },
    { path: 'expliq', component: ExpliqComponent },


    {path: '**', component: NotFoundComponent}
];
