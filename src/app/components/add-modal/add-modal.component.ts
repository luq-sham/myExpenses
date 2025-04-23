import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonGrid, IonCol, IonRow, IonFooter, IonSelect, IonSelectOption, IonInput, IonLabel, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, 
    IonGrid, IonCol, IonRow, IonFooter, IonSelect, IonSelectOption,IonInput, IonLabel, IonItem
  ],
})

export class AddModalComponent  implements OnInit {

  title = "";
  types:any[] = [];
  initialValue:any;
  
  params: any = {
    account_name: '',
    account_type: '',
    balance: 0,
    user: sessionStorage.getItem('email'),
    created_at: new Date(),
    updated_at: new Date()
  }
  
  constructor(
    private api: ApiService,
    private modalController: ModalController,
    private alert: AlertService,
    private loading: LoadingService,
    private toast: ToastService
  ) {
    addIcons({close})
  }

  ngOnInit() {
    this.getData();
  }
  
  getData(){
    this.api.getAccountType().subscribe((res)=>{
      this.types = res.return_data;
    })
  }
  
  onSubmit(){
    this.params.account_name = this.params.account_name.trim().toLowerCase();

    if(this.params.account_name && this.params.account_type){
      this.alert.customComfirmationAlert('Create Account','Are you sure to create this account').then(res=>{
        if(res == 'confirm'){
          this.loading.showLoading()
          this.api.postAddAccount(this.params).subscribe( res =>{
            this.loading.hide()
            if(res.status_code == '200'){
              this.toast.customToast('Account successfully created.', 4000, 'success')
              this.modalController.dismiss(true);
            }else if(res.status_code == '400'){
              this.toast.customToast(res.msg , 3000, 'warning')
            }
          })
        }
      })
    }else{
      this.alert.customAlert('Warning','Please enter all the required information')
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
