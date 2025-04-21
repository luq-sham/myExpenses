import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FabComponent } from '../components/fab/fab.component';
import { AddModalComponent } from '../components/add-modal/add-modal.component';
import { addIcons } from 'ionicons';
import { addCircle, addCircleSharp } from 'ionicons/icons';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { TwoDecimalPipe } from '../pipes/two-decimal-pipe.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HeaderComponent, 
    FabComponent, 
    IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, 
    IonGrid, IonRow, IonCol, IonIcon, TwoDecimalPipe
  ],
})
export class DashboardPage implements OnInit {
  
  
  doughnutChart: any;
  data: any[] = [];
  password: string = '';
  email: string = '';
  param: any = {};
  dataCerdencial:any;
  items: any[] = [];
  
  constructor(
    private modal: ModalController,
    private api: ApiService,
    private loading: LoadingService
  ) {
    addIcons({addCircle,addCircleSharp})
  }
  
  ngOnInit() {
    this.getAccountData()
  }

  getAccountData(){
    this.loading.showLoading();
    this.api.getAccount().subscribe(res=>{
      if(res.status_code == 200){
        this.loading.hide();
        this.items = res.return_data
      }

    })
  }

  async modalAddAccount(){
    const modal = await this.modal.create({
      component:AddModalComponent,
      componentProps: {title:"Add Account"}
    });
    await modal.present();
    const { data } = await modal.onDidDismiss()

    if(data){
      this.refreshPage()
    }
  }

  refreshPage(){
    this.loading.showLoading();
    this.api.getAccount().subscribe(res=>{
      if(res.status_code == 200){
        this.loading.hide();
        this.items = res.return_data
      }

    })
  }

  
}
