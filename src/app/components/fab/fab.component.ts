import { Component, OnInit } from '@angular/core';
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular/standalone'
import { AddModalComponent } from '../add-modal/add-modal.component';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  imports: [IonFabList,  IonFab, IonFabButton, IonIcon],
})
export class FabComponent  implements OnInit {

  constructor(
    private modal: ModalController,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit() {}

  async addExpensesModal(){
    const param = {
      add_id: 2,
      title: 'New Transaction',
    }

    const modal = await this.modal.create({
      component:AddModalComponent,
      componentProps:param
    });

    await modal.present()
    const { data } = await modal.onDidDismiss()

    if (data){
      window.location.href = '/dashboard';
    }
  }

  async manageTransaction(){
    this.alert.customAlert('Manage Transaction', 'This feature is not available yet. Kindly check back later.');
  }

  async manageAccount(){
    this.alert.customAlert('Manage Account', 'This feature is not available yet. Kindly check back later.');
  }

}
