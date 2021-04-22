import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { Action, State, StateContext } from '@ngxs/store';
import { StateName } from '../state-name.enum';
import { UserActions } from './users.actions';
import { User } from './users.model';

export interface UserStateModel {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean | null;
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

  @Action(UserActions.SignIn)
  async signIn(
    { getState, patchState }: StateContext<UserStateModel>,
    { email, password }: UserActions.SignIn,
  ): Promise<void> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    try {
      // Signs in and gets token id
      const { user } = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password,
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

      patchState({ user: userData, accessToken: token, isLoading: false });
    } catch (error) {
      console.log(error);
      patchState({ ...state, error: error.message });
    }
  }

  @Action(UserActions.SignUp)
  async signUp(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: UserActions.SignUp,
  ): Promise<void> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    try {
      const { user } = await this.fireAuth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );

      await this.firestore
        .collection(FirestoreCollection.Users)
        .doc(user?.uid)
        .set({
          id: user?.uid,
          ...payload,
        });
    } catch (error) {
      console.log(error);
      patchState({ ...state, isLoading: false, error: error.message });
    }
  }
}
