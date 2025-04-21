import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuController, IonCard, IonCardContent, IonGrid, IonCol, IonRow, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonRow, IonCol, IonGrid, IonCardContent, IonCard, IonContent, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.menu.enable(false);
  }
  

}
