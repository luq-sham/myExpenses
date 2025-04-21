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
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonGrid, IonCol, IonRow, IonFooter, IonSelect, IonSelectOption, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, 
    IonGrid, IonCol, IonRow, IonFooter, IonSelect, IonSelectOption,IonInput
  ],
})

export class AddModalComponent  implements OnInit {

  title = "";
  types:any[] = [];
  initialValue:any;
  
  params: any = {
    account_name: "",
    account_type: "",
    balance: 0,
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
    if(this.params.account_name && this.params.account_type){
      this.alert.customComfirmationAlert('Create Account','Are you sure to create this account').then(res=>{
        if(res == 'confirm'){
          this.loading.showLoading()
          this.api.postAddAccount(this.params).subscribe( res =>{
            if(res.status_code == '200'){
              this.loading.hide()
              this.toast.customToast('Success. Account successfully created.', 2000, 'success')
              this.modalController.dismiss(true);
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
