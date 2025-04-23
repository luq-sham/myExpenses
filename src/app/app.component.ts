import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, paperPlaneSharp, statsChartOutline, statsChartSharp, logOutOutline, settings } from 'ionicons/icons';
import { AlertService } from './services/alert.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonCard, IonCardContent ]
})
export class AppComponent implements OnInit {

  allowedPaths: string[] = ['/login', '/register'];
  display: boolean = false;

  name: string = '';
  email: string = '';

  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'stats-chart' },
    { title: 'Butget/Goal', url: '/folder1', icon: 'paper-plane' }
  ];

  constructor(
    private router: Router,
    private alert: AlertService
  ) {
    addIcons({ paperPlaneOutline, paperPlaneSharp, statsChartOutline, statsChartSharp, logOutOutline, settings });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.display = !this.allowedPaths.includes(event.urlAfterRedirects);
        this.loadUserDetails();
      });

  }

  loadUserDetails() {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      const userDetails = JSON.parse(storedUser);
      this.name = userDetails.name;
      this.email = userDetails.email;
    } else {
      this.name = '';
      this.email = '';
    }
  }

  async logout(): Promise<void> {
    const res = await this.alert.customComfirmationAlert(
      'Logout',
      'Are you sure to logout',
      'Logout',
      'Cancel'
    );
    if (res === 'confirm') {
      localStorage.clear();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
}
