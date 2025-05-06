import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonLabel, IonList, IonIcon, IonAvatar, IonSkeletonText } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.page.html',
  styleUrls: ['./transaction-list.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonAvatar, IonIcon, IonList, IonLabel, IonItem, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class TransactionListPage implements OnInit {

  transactions: any[] = [];
  loadings: boolean = true;

  constructor(
    private api: ApiService,
    private alert: AlertService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.getTransactionsData()
  }

  getTransactionsData() {
    const token = {
      user: localStorage.getItem('email'),
    };

    this.loadings = true;
    this.api.getTransactionsByUser(token).subscribe({
      next: (res) => {
        this.transactions = res.return_data;
        this.loadings = false;
      },
      error: (err) => {
        this.loadings = false;
        this.alert.customAlert('Error', 'Unable to fetch transactions. Please try again later.');
      }
    });
  }

}
