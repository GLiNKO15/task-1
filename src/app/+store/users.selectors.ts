import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInterface} from "../types/type-user";

export const selectFeatureUser = createFeatureSelector<UserInterface[]>('users');

export const usersSelector = createSelector(
	selectFeatureUser,
	(state: UserInterface[]) => state
)

export const getUsersSelector = createSelector(
	selectFeatureUser,
	(state: UserInterface[]) => state
)