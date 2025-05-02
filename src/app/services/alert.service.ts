import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alert: AlertController
  ) { }

  async customComfirmationAlert( header: string, msg: string, confirmMsg?: string, cancleMsg?: string, css?: string ) {
    const alert = await this.alert.create({
      header: header,
      message: msg,
      cssClass: css ? css : 'custom-alert',
      buttons: [
        {
          text: cancleMsg ? cancleMsg : 'Cancel',
          role: 'cancel'
        },
        {
          text: confirmMsg ? confirmMsg : 'Confirm',
          role: 'confirm',
          cssClass: css ? 'confirm-red' : ''  // Apply red only if css is passed
        },
      ]
    });
  
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
  

  async customAlert(header:string, msg:string, okMsg?:string){
    const alert = await this.alert.create({
      header: header,
      message: msg,
      backdropDismiss:false,
      buttons:[
        {
          text: okMsg ? okMsg :'OK',
          role: 'confirm'
        }
      ]
    })

    await alert.present();
    const { role } = await alert.onDidDismiss()
    return role
  }
}
