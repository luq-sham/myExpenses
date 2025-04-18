import { Component, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonIcon , ModalController} from '@ionic/angular/standalone';
import { addCircleOutline, addCircleSharp, addCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HeaderComponent } from '../components/header/header.component';
import { FabComponent } from '../components/fab/fab.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCol, IonRow, IonGrid, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, HeaderComponent, FabComponent],
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
    private modal: ModalController 
  ) { 
    addIcons({addCircleOutline, addCircleSharp, addCircle});
  }
  
  ngOnInit() {
    
  }

  
}
