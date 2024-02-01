import { UsersApiActions } from './users.actions';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UsersApiService } from '../services/users-api.service';

@Injectable() 
export class UserEffects {
  actions$ = inject(Actions);
  apiService = inject(UsersApiService);

  UsersRequest = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UsersApiActions.usersApiRequest),
        switchMap(
          () => this.apiService.getUsers().pipe(
            map(users => UsersApiActions.usersApiFind({users})),
            catchError((error) => {
              console.error('Error', error);
              return of(UsersApiActions.usersApiFailed({ error }))
            })
          )
        ),
      )
    }, { functional: true }
  )
}
