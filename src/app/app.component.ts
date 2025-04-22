import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, paperPlaneSharp, statsChartOutline, statsChartSharp, logOutOutline, settings } from 'ionicons/icons';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [ RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {

  router = inject(Router)

  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'stats-chart' },
    { title: 'Outbox', url: '/folder1', icon: 'paper-plane' },
  ];
  constructor(
    private alert:AlertService
  ) {
    addIcons({ paperPlaneOutline, paperPlaneSharp, statsChartOutline, statsChartSharp, logOutOutline, settings });
  }

  async logout(){
    this.alert.customComfirmationAlert('Logout','Are you sure to logout','Logout','Cancel').then( async res => {
      if(res == 'confirm'){
        await sessionStorage.clear();
        this.router.navigateByUrl('/login',{replaceUrl:true})
      }
    })
  }
}
