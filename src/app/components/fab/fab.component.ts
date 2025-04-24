import { Component, OnInit } from '@angular/core';
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronUpCircle , document, colorPalette, globe, add} from 'ionicons/icons';
import { ModalController } from '@ionic/angular/standalone'
import { AddModalComponent } from '../add-modal/add-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  imports: [IonFabList,  IonFab, IonFabButton, IonIcon],
})
export class FabComponent  implements OnInit {

  constructor(
    private modal: ModalController,
    private router: Router
  ) {
    addIcons({chevronUpCircle, document, colorPalette, globe, add});
   }

  ngOnInit() {}

  async addExpensesModal(){
    const param = {
      add_id: 2,
      title: 'New Record',
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

}
