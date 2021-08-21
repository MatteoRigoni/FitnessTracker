import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  //exercises: Observable<Exercise[]>;
  exercisesSubscription: Subscription;
  loadingSubscription: Subscription;
  isLoading$ : Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private UIService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.UIService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(result => {
      this.exercises = result;
    },);
    this.fetchExercises();
    //this.exercises = this.trainingService.getAvailableExercises();
  }

  ngOnDestroy(): void {
    // if (this.exercisesSubscription) {
    //   this.exercisesSubscription.unsubscribe();
    // }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.selectedExercise);
  }
}
