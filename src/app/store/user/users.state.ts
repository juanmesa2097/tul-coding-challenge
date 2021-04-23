import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateName } from '../state-name.enum';
import { UserActions } from './users.actions';
import { User } from './users.model';

export interface UserStateModel {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

@State<UserStateModel>({
  name: StateName.User,
  defaults: {
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
  },
})
@Injectable()
export class UserState {
  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  @Selector()
  static isLoggedIn({ accessToken }: UserStateModel): boolean {
    return !!accessToken;
  }

  @Selector()
  static token({ accessToken }: UserStateModel): string | null {
    return accessToken;
  }

  @Selector()
  static user({ user }: UserStateModel): User | null {
    return user;
  }

  @Selector()
  static isLoading({ isLoading }: UserStateModel): boolean {
    return isLoading;
  }

  @Selector()
  static error({ error }: UserStateModel): string | null {
    return error;
  }

  @Action(UserActions.SignIn)
  async signIn(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: UserActions.SignIn,
  ): Promise<void> {
    const state = getState();
    patchState({ ...state, isLoading: true });
    console.log(payload);
    try {
      // Signs in and gets token id
      const { user } = await this.fireAuth.signInWithEmailAndPassword(
        payload.email,
        payload.password,
      );

      const token = await user?.getIdToken(true);

      // Gets user data by uid
      const userData = (
        await this.firestore
          .collection(FirestoreCollection.Users)
          .doc(user?.uid)
          .get()
          .toPromise()
      ).data() as User;

      patchState({
        user: userData,
        accessToken: token,
        isLoading: false,
        error: null,
      });
    } catch ({ message }) {
      patchState({
        ...state,
        error: message,
      });
    }
  }

  @Action(UserActions.SignUp)
  async signUp(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload: { email, password, name, lastname } }: UserActions.SignUp,
  ): Promise<void> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    try {
      const { user } = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await this.firestore
        .collection(FirestoreCollection.Users)
        .doc(user?.uid)
        .set({
          id: user?.uid,
          email,
          name,
          lastname,
        });

      patchState({ ...state, isLoading: false, error: null });
    } catch (error) {
      console.log(error);
      patchState({ ...state, isLoading: false, error: error.message });
    }
  }

  @Action(UserActions.SignOut)
  signOut({ setState }: StateContext<UserStateModel>): void {
    setState({
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,
    });
  }
}
