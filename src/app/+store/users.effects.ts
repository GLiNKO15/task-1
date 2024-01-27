import { UsersApiActions } from './users.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { UsersApiService } from '../services/users-api.service';
import { inject } from '@angular/core';

// @Injectable()
// export class MoviesEffects {

//   loadUsers$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(apiRequestUser),
//       exhaustMap(() => this.usersService.getUsers()
//         .pipe(
//           map(users => ({ type: '[Users/Api] Users api find', payload: users })),
//           catchError((error) => of({ type: '[Users/Api] Users api failed', payload: error}))
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private usersService: UsersApiService
//   ) {}
// }

// export const 

export const loadUsers = createEffect(
  () => {
    const actions$ = inject(Actions);
    const service$ = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersApiActions.usersApiRequest),
      exhaustMap(() =>
        service$.getUsers().pipe(
          map(( users ) => UsersApiActions.usersApiFind({ users })),
          catchError((error: { message: unknown }) =>
            of(UsersApiActions.usersApiFailed({ error: error.message }))
          )
        )
      )
    )
  },
  { functional: true }
);