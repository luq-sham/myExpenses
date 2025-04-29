import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController, AlertController, LoadingController, ToastController, IonContent, IonGrid, IonRow, IonCol, IonCardContent, IonCard, IonIcon, IonItem, IonButton, IonFooter, IonToolbar, IonTitle, IonInput,} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosed, logInOutline, mail} from 'ionicons/icons';

import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonFooter, IonButton, IonItem, IonIcon, IonCard, IonCardContent, IonCol, IonRow, IonGrid, IonContent, IonInput, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  deferredPrompt: any = null;
  showInstallButton: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private menu: MenuController,
    private api: ApiService,
    private alert: AlertService
  ) {
    addIcons({ mail, lockClosed, logInOutline, eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
    this.initForm();

    
    // PWA install prompt logic
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });
    
    
    
  }

  showInstall(){
    if(this.deferredPrompt){
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

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  encryptPassword(password: string): string {
    const secretKey = 'myExpenses';
    const hashedKey = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(secretKey).toString());

    const encrypted = CryptoJS.AES.encrypt(password, hashedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  async onSubmit() {
    if (!this.loginForm.valid) return;

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
    });
    await loading.present();

    const credentials = {
      email: this.email?.value,
      password: this.encryptPassword(this.password?.value),
    };

    this.api.postLoginUsers(credentials).subscribe({
      next: async (res) => {
        await loading.dismiss();

        if (res.status_code === 200) {
          localStorage.clear()
          localStorage.setItem('email', res.userData.email);
          localStorage.setItem('userDetails', JSON.stringify(res.userData));
          await this.presentToast('Login successful!', 'success');
          this.loginForm.reset();
          this.router.navigate(['dashboard']);

        } else {
          this.alert.customAlert('Try Again', res.error || 'Unexpected error.');
        }
      },
      error: async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: 'An error has occurred. Kindly try again later.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      message: `Enter your email address and we'll send you a reset link.`,
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Your email address',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send Reset Link',
          handler: (data) => {
            if (data.email) {
              // Implement reset service call here
              this.presentToast('Reset link sent to your email');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  goToSignup() {
    this.router.navigate(['/register']);
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
}
