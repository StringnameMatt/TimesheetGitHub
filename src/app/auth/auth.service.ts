import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId: any = 'admin';
  private _userApproval = 'y';
  private _placeId = 'def'
  private _requestId = 'ghi'

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  get placeId() {
    return this._placeId;
  }

  get requestId() {
    return this._requestId;
  }

  get userApproval() {
    return this._userApproval;
  }

  constructor(
    private toastCtrl: ToastController,
    private http: HttpClient
  ) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      environment.firebaseAPIKey
    }`, {email: email, password: password, returnSecureToken: true}
    );
  }

  login() {
    this._userIsAuthenticated = true;
    console.log(this.userIsAuthenticated);
  }

  logout() {
    this._userIsAuthenticated = false;
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Logged Out',
      duration: 2000,
      position: "bottom",
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }


}
