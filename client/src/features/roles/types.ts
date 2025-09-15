export const SET_ROLES = 'roles/SET_ROLES';

export interface Role {
  id: string;
  name: string;
}

export interface RolesState {
  list: Role[];
}

export interface SetRolesAction {
  type: typeof SET_ROLES;
  payload: Role[];
}

export type RolesActionTypes = SetRolesAction;