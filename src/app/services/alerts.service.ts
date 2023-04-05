import { Injectable } from '@angular/core';
import { AlertController, ToastController, ToastOptions } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }


  public async generateToast( options: ToastOptions ) {
    const toast = await this.toastCtrl.create({...options, mode: 'ios'});
    await toast.present();
  }

}
