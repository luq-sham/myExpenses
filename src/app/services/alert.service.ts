import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alert: AlertController
  ) { }

  async customComfirmationAlert(header:string, msg:string, confirmMsg?:string, cancleMsg?:string){
    const alert = await this.alert.create({
      header: header,
      message: msg,
      buttons:[
        {
          text: cancleMsg ? cancleMsg : 'Cancel',
          role: 'cancel'
        },
        {
          text: confirmMsg ? confirmMsg : 'Confirm',
          role: 'confirm'
        },
      ]
    })

    await alert.present();
    const { role } = await alert.onDidDismiss()
    return role
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
