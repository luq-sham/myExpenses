// login.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController,AlertController, LoadingController, ToastController } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosed, logInOutline, mail } from 'ionicons/icons';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, ReactiveFormsModule]
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
    addIcons({mail,lockClosed, logInOutline, eyeOutline,eyeOffOutline})
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
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

  async onSubmit() {
    if (!this.loginForm.valid) return;

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Here you would normally call your authentication service
      // Example: await this.authService.login(this.loginForm.value);
      
      // Simulate network delay
      const userData = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
      this.api.postLoginUsers(userData).subscribe(async res => {
        await loading.dismiss();
        if(res.status_code == 200){
          const toast = await this.toastController.create({
            message: 'Login successful!',
            duration: 2000,
            color: 'success',
            position: 'bottom'
          });
          await toast.present();
          this.router.navigate(['dashboard']);
        }else{
          this.alert.customAlert('Try Again',res.error)
        }
      })
    } catch (error) {
      await loading.dismiss();
      
      // Show error alert
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Invalid email or password. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      message: 'Enter your email address and we\'ll send you a link to reset your password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Your email address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Send Reset Link',
          handler: (data) => {
            if (data.email) {
              // Here you would call your password reset service
              // Example: this.authService.resetPassword(data.email);
              this.presentToast('Reset link sent to your email');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // async socialLogin(provider: string) {
  //   // Here you would implement social login
  //   // Example: this.authService.socialLogin(provider);
  //   this.presentToast(`Logging in with ${provider}...`);
  // }

  goToSignup() {
    this.router.navigate(['/register']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  ionViewDidEnter(): void {
    this.menu.enable(false);
  }
}