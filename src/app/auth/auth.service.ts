import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {
  //authChange = new Subject<boolean>();
  //private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private UIService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        //this.isAuthenticated = true;
        //this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        //this.isAuthenticated = false;
        //this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    //this.UIService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());

    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        //this.UIService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        console.log(result);
      })
      .catch((error) => {
        //this.UIService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.UIService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    //this.UIService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());

    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        //this.UIService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        console.log(result);
      })
      .catch((error) => {
        //this.UIService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.UIService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.signOut();
  }

  // isAuth(): boolean {
  //   return this.isAuthenticated;
  // }
}
