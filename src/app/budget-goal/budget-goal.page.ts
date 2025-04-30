import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { IonContent, IonList, IonItem, IonLabel, IonCard, IonIcon,} from '@ionic/angular/standalone';
import { AlertService } from '../services/alert.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-budget-goal',
  templateUrl: './budget-goal.page.html',
  styleUrls: ['./budget-goal.page.scss'],
  standalone: true,
  imports: [ IonIcon, IonCard, IonLabel, IonItem, IonList, IonContent, CommonModule, FormsModule, HeaderComponent, RouterLink,],
})
export class BudgetGoalPage implements OnInit {
  constructor(private alert: AlertService) {}

  ngOnInit() {}

  openSoon() {
    this.alert.customAlert(
      'Coming Soon',
      'This feature is coming soon! Stay tuned for updates.'
    );
  }
}
