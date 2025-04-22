// login.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule,} from '@ionic/angular';
import { MenuController, AlertController, LoadingController, ToastController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosed, logInOutline, mail} from 'ionicons/icons';

import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

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
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  // Getters for form fields
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (!this.loginForm.valid) return;

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
    });
    await loading.present();

    const userData = {
      email: this.email?.value,
      password: this.password?.value,
    };

    this.api.postLoginUsers(userData).subscribe({
      next:async (res) => {
        await loading.dismiss();
        if (res.status_code === 200) {
          const toast = await this.toastController.create({
            message: 'Login successful!',
            duration: 2000,
            color: 'success',
            position: 'bottom',
          });
          await toast.present();
          this.router.navigate(['dashboard']);
        } else {
          this.alert.customAlert('Try Again', res.error || 'Unexpected error.');
        }
      },
      
      error:async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: 'Invalid email or password. Please try again.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      message: 'Enter your email address and we\'ll send you a reset link.',
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }
}
