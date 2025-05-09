import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonCard, IonItem, IonIcon, IonLabel, IonCardContent, IonGrid, IonRow, IonCol, IonAvatar, IonSkeletonText,} from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
  standalone: true,
  imports: [ IonSkeletonText, IonLabel, IonIcon, IonItem, IonCard, IonList, IonContent, CommonModule, FormsModule, HeaderComponent, IonAvatar, IonCardContent, IonGrid, IonRow, IonCol,],
})
export class AccountListPage implements OnInit {
  accounts: any[] = [];
  type: any = '';
  loading: boolean = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.type = params['type'];
      }
    });
    this.getAccounts();
  }

  getAccounts() {
    this.loading = true;
    const token = {
      user_id: localStorage.getItem('token'),
    };
    this.api.postAccountByUser(token).subscribe((res: any) => {
      this.accounts = res.return_data;
      this.loading = false;
    });
  }

  openAccount(type: any, account: any) {
    if (type == 'budget'){
      this.router.navigate(['/', type], {
        queryParams: { id: account },
      });
    }
  }
}
