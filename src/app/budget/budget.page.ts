import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel, IonNote, IonFab, IonFabButton, IonIcon, IonCard } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ModalController } from '@ionic/angular/standalone';
import { AddModalComponent } from '../components/add-modal/add-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
  standalone: true,
  imports: [IonCard, IonIcon, IonFabButton, IonFab, IonNote, IonLabel, IonItem, IonList,  IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class BudgetPage implements OnInit {

  budgets:any[] = []
  acc_id: any = ''

  constructor(
    private modal: ModalController,
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.acc_id = params['id'];
      }
    });
    this.getBudgetsData()
  }

  getBudgetsData(){
    const token = {
      account: this.acc_id,
    };

    this.api.getBudget(token).subscribe((res) => {
      this.budgets = res.return_data
    })
  }

  openBudget(budget:any){
    console.log(budget)
  }

  async addBudget(){
    const param = {
      add_id: 3,
      title: 'Add Budget',
      acc_id: this.acc_id,
    };
    const modal = await this.modal.create({
      component: AddModalComponent,
      componentProps: param,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      window.location.href = '/budget?id=' + this.acc_id;
    }
  }

}
