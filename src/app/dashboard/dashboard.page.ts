import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonCard, IonContent, IonCardContent, IonRow, IonCol, IonIcon, IonAvatar, IonSkeletonText, IonItem, IonLabel, IonNote, IonList, IonProgressBar, IonCardHeader, IonCardTitle, IonRippleEffect, IonGrid, } from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FabComponent } from '../components/fab/fab.component';
import { AddModalComponent } from '../components/add-modal/add-modal.component';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { AlertService } from '../services/alert.service';

import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { Capacitor } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [ IonGrid, IonRippleEffect, IonCardTitle, IonCardHeader, IonProgressBar, IonList, IonNote, IonLabel, IonItem,  IonSkeletonText,  IonAvatar, IonIcon, IonCol, IonRow, IonCardContent, IonCard, IonContent, CommonModule, FormsModule, HeaderComponent, FabComponent,],
})
export class DashboardPage implements OnInit {
  doughnutChart: any;
  data: any[] = [];
  password: string = '';
  email: string = '';
  param: any = {};
  dataCerdencial: any;
  account_list: any[] = [];
  transactions: any[] = [];
  loadings: boolean = true;

  budgets: any[] = [];
  acc_id: any = '';


  constructor(
    private modal: ModalController,
    private api: ApiService,
    private loading: LoadingService,
    private alert: AlertService,
    private menu: MenuController,
    private route: ActivatedRoute,
    private printer: Printer
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const token = {
      user: localStorage.getItem('email'),
    };
    
    this.loadings = true;
    this.api.postAccountByUser(token).subscribe({
      next: async (res) => {
        if (res.status_code == 200) {
          this.api.getTransaction(token).subscribe({
            next: async (res2) => {
              if (res.status_code == 200) {
                this.api.getBudgetByUser(token).subscribe({
                  next: async (res3) => {
                    if (res.status_code == 200) {
                      this.account_list = res.return_data;
                      this.transactions = res2.return_data;
                      this.budgets = res3.return_data;
                    }
                    this.loadings = false;
                  },
                  error: async () => {
                    await this.loading.hide();
                    this.alert.customAlert(
                      'Loading Failed',
                      'An error has occurred. Kindly try again.(budget)'
                    );
                  },
                })
              }
            },
            error: async () => {
              await this.loading.hide();
              this.alert.customAlert(
                'Loading Failed',
                'An error has occurred. Kindly try again.(transaction)'
              );
            },
          });
        }
      },
      error: async () => {
        await this.loading.hide();
        this.alert.customAlert(
          'Loading Failed',
          'An error has occurred. Kindly try again.(account)'
        );
      },
    });
  }

  openBudget(budget: any) {
    console.log(budget);
  }

  getProgressColor(budget: any): string {
    const progress = budget.used_amount / budget.amount;
    if (progress < 0.5) 
      return 'success';
    else if (progress < 0.9) 
      return 'warning';
    else return 'danger';
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

  // printContent() {
  //   const contentElement = document.getElementById('print-section');
  //   const content = `
  //     <html>
  //       <body>
  //         ${contentElement?.outerHTML || ''}
  //       </body>
  //     </html>
  //   `;
  
  //   if (Capacitor.getPlatform() === 'web') {
  //     // Web fallback
  //     const printWindow = window.open('', '', 'width=800,height=600');
  //     if (printWindow) {
  //       printWindow.document.write(content);
  //       printWindow.document.close();
  //       printWindow.focus();
  //       printWindow.print();
  //     }
  //   } else {
  //     // Native
  //     const options: PrintOptions = {
  //       name: 'Test Print',
  //     };
  
  //     this.printer.print(content, options).then(
  //       () => console.log('Print successful'),
  //       (err) => console.error('Print failed:', err)
  //     );
  //   }
  // }

  ionViewDidEnter(): void {
    this.menu.enable(true);
  }
}
