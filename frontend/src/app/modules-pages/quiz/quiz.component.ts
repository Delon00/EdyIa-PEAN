//frontend/src/app/modules-pages/quiz/quiz.component.ts
import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  formQuiz: FormGroup;
  quiz: any[] = [];

  constructor(private backendService: BackendService, private fb: FormBuilder) {
    this.formQuiz = this.fb.group({
      topic: [''],
      numberOfQuestions: [1]
    });
  }

  onSubmit() {
    const { topic, numberOfQuestions } = this.formQuiz.value;
    console.log('Données du formulaire:', { topic, numberOfQuestions });
    this.backendService.generateQuiz(topic, numberOfQuestions).subscribe(
      response => {
        console.log('Réponse du serveur:', response); 
        this.quiz = response.quiz;
      },
      error => {
        console.error('Erreur lors de la génération du quiz:', error);
        alert('Erreur lors de la génération du quiz. Veuillez réessayer.');
      }
    );
  }
}
