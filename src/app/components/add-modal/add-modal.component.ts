import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { LoadingService } from 'src/app/services/loading.service';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonGrid, IonCol, IonRow, IonFooter, IonSelect, IonSelectOption } from "@ionic/angular/standalone";

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  standalone:true,
  imports: [IonFooter, IonRow, IonCol, IonGrid, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, FormsModule, IonSelect, IonSelectOption]
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
    private loading: LoadingService
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
              this.alert.customAlert('Success','Account successfully created').then(role=>{
                if(role == 'confirm'){
                  this.modalController.dismiss(true);
                }
              })
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
