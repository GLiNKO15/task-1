import { UsersApiActions } from './users.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UsersApiService } from '../services/users-api.service';

@Injectable()
export class UsersRequest {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.usersApiRequest),
      exhaustMap(() => this.usersService.getUsers()
        .pipe(
          map(( users ) => UsersApiActions.usersApiFind({ users })),
          catchError((error) => of(UsersApiActions.usersApiFailed({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersApiService
  ) {}
}

// export const loadUsers = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const service$ = inject(UsersApiService);

//     return actions$.pipe(
//       ofType(UsersApiActions.usersApiRequest),
//       switchMap(() => service$.getUsers().pipe(
//           map(( users ) => UsersApiActions.usersApiFind({ users })),
//           catchError((error: { message: unknown }) => of(UsersApiActions.usersApiFailed({ error: error.message })))
//         )
//       )
//     )
//   },
//   { functional: true }
// );