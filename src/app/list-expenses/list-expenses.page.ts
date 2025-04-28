import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.page.html',
  styleUrls: ['./list-expenses.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class ListExpensesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
