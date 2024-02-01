import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInterface} from "../types/type-user";

export const selectFeatureUser = createFeatureSelector<{items: UserInterface[], error:{massage:unknown}}>('users');

export const getUsersSelector = createSelector(
	selectFeatureUser,
	(state: {items: UserInterface[], error: {massage:unknown}}) => state.items
)