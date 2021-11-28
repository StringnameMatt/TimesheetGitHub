import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = 'admin';
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
    private toastCtrl: ToastController
  ) {}

  login() {
    this._userIsAuthenticated = true;
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
