import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonCard, IonContent, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonAvatar, IonBadge } from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FabComponent } from '../components/fab/fab.component';
import { AddModalComponent } from '../components/add-modal/add-modal.component';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { TwoDecimalPipe } from '../pipes/two-decimal-pipe.pipe';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [ IonBadge, IonAvatar, IonIcon, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonContent, CommonModule, FormsModule, HeaderComponent, FabComponent, TwoDecimalPipe,],
})
export class DashboardPage implements OnInit {
  doughnutChart: any;
  data: any[] = [];
  password: string = '';
  email: string = '';
  param: any = {};
  dataCerdencial: any;
  items: any[] = [];
  records: any[] = [];

  constructor(
    private modal: ModalController,
    private api: ApiService,
    private loading: LoadingService,
    private alert: AlertService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const token = {
      user: localStorage.getItem('email'),
    };

    this.loading.showLoading();
    this.api.postAccountByUser(token).subscribe({
      next: async (res) => {
        if (res.status_code == 200) {
          this.api.getRecord(token).subscribe({
            next: async (res2) => {
              if (res.status_code == 200) {
                this.items = res.return_data;
                this.records = res2.return_data;
              }
              this.loading.hide();
            },

            error: async () => {
              await this.loading.hide();
              this.alert.customAlert(
                'Loading Failed',
                'An error has occurred. Kindly try again.'
              );
            },
          });
        }
      },
      error: async () => {
        await this.loading.hide();
        this.alert.customAlert(
          'Loading Failed',
          'An error has occurred. Kindly try again.'
        );
      },
    });
  }

  async modalAddAccount() {
    const param = {
      add_id: 1,
      title: 'Add Account',
    };
    const modal = await this.modal.create({
      component: AddModalComponent,
      componentProps: param,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.getData();
    }
  }

  ionViewDidEnter(): void {
    this.menu.enable(true);
  }
}
