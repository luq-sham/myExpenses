import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { paperPlaneOutline, paperPlaneSharp, statsChartOutline, statsChartSharp, logOutOutline, settings } from 'ionicons/icons';
import { AlertService } from './services/alert.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, RouterLink, RouterLinkActive ]
})
export class AppComponent implements OnInit {

  allowedPaths: string[] = ['/login', '/register'];
  display: boolean = false;

  deferredPrompt: any = null;
  showInstallButton: boolean = false;

  name: string = '';
  email: string = '';

  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'stats-chart' },
    { title: 'Budget/Goal', url: '/folder1', icon: 'paper-plane' }
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

    // PWA install prompt logic
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });
  }

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
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
