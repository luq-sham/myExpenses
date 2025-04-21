// register.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosed, mail, person, personAdd, call, checkmarkDone, cash, } from 'ionicons/icons';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private menu: MenuController,
    private api: ApiService
  ) { 
    addIcons({mail, lockClosed, eyeOutline, eyeOffOutline, person, personAdd, call, checkmarkDone,cash});
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      currency: ['USD', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ notMatching: true });
    }
    
    return null;
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get currency() {
    return this.registerForm.get('currency');
  }

  get termsAccepted() {
    return this.registerForm.get('termsAccepted');
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  async onSubmit() {
    if (!this.registerForm.valid) return;

    const loading = await this.loadingController.create({
      message: 'Creating account...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const userData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        currency: this.registerForm.value.currency,
        password: this.registerForm.value.password
      };

      this.api.postRegisterUsers(userData).subscribe(async res =>{
        if(res.status_code == 200){
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Registration successful!',
            duration: 2000,
            color: 'success',
            position: 'bottom'
          });
          await toast.present();
          
          // Navigate to login page
          this.router.navigate(['/login']);
        }
      })
      
      // Show success toast
    } catch (error) {
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Registration Failed',
        message: 'There was an error creating your account. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async showTerms() {
    const alert = await this.alertController.create({
      header: 'Terms & Conditions',
      message: 'By creating an account, you agree to our Terms of Service and Privacy Policy. We will process your personal information in accordance with these terms.',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ionViewDidEnter(): void {
    this.menu.enable(false);
  }
}