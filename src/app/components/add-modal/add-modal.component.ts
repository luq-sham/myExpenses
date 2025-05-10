import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonCol, IonRow, IonFooter, IonSelect, IonSelectOption, IonInput, IonLabel, IonItem, IonTextarea, IonPopover, IonDatetime, IonSegment, IonSegmentButton, IonSegmentView, IonSegmentContent, IonToggle, IonNote, IonGrid } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  standalone: true,
  imports: [IonGrid, IonNote, IonToggle, IonSegment, IonSegmentButton, IonSegmentView, IonSegmentContent, IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonSelect, IonSelectOption, IonInput, IonLabel, IonItem, IonTextarea, IonPopover, IonDatetime, IonContent, IonCol, IonRow, IonFooter, IonSelect, IonSelectOption, IonInput, IonLabel, IonItem, IonTextarea, IonPopover, IonDatetime, CommonModule, FormsModule,],
})
export class AddModalComponent implements OnInit {
  add_id = 0;
  title = '';

  types: any[] = [];
  categories: any[] = [];
  income: any[] = [];
  expense: any[] = [];
  accountUser: any[] = [];

  params: any = {};
  params1: any = {};
  params2: any = {};

  label: any;
  disabled: boolean = true;

  acc_id: any = '';
  maxDate: string = '';


  selectedSegment = 'first';
  percent_disabled = true;

  constructor(
    private api: ApiService,
    private modalController: ModalController,
    private alert: AlertService,
    private loading: LoadingService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getData();
    this.modalInput();
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  getData() {
    if (this.add_id == 1) {
      this.api.getAccountType().subscribe((res) => {
        this.types = res.return_data;
      });
    }

    if (this.add_id == 2) {
      const token = {
        user_id: localStorage.getItem('token'),
      };

      this.api.getTransactionCategories().subscribe((res) => {
        this.income = res.income;
        this.expense = res.expense;
      });

      this.api.postAccountByUser(token).subscribe({
        next: async (res) => {
          if (res.status_code == 200) {
            this.accountUser = res.return_data;
          }
        },

        error: async () => {
          await this.loading.hide();
          this.alert.customAlert(
            'Loading Failed',
            'An error has occurred. Kindly try again.'
          );
        },
      });
    }

    if (this.add_id == 3) {
      const token = {
        user_id: localStorage.getItem('token'),
      };

      this.api.getTransactionCategories().subscribe((res) => {
        this.expense = res.expense;
      });
    }
  }

  modalInput() {
    switch (this.add_id) {
      //add account
      case 1:
        this.params = {
          account_name: '',
          account_type: '',
          balance: null,
        };
        break;

      //add Transaction
      case 2:
        this.params = {
          transaction_amount: null,
          transaction_category: '',
          accounts: "",
          transaction_description: '',
          sub_category: '',
          transaction_date: this.getLocalIsoString(),
          transaction_type: '',
        };
        break;

      //add budget
      case 3:
        this.params1 = {
          budget_name: '',
          budget_type: '',
          accounts: this.acc_id,
          amount: null,
        };

        this.params2 = {
          amount: '',
          prefix: new Date().toLocaleString('default', { month: 'long' }) + ' Budget',
          needs_percent: 50,
          wants_percent: 30,
          savings_percent: 20,
          accounts: this.acc_id,
        };
        break;
    }
  }

  onSubmit() {
    let param: any = {};

    switch (this.add_id) {
      //add account
      case 1:
        if (this.params.account_name && this.params.account_type) {
          this.params.account_name = this.params.account_name.trim().toLowerCase();
          param = {
            ...this.params,
            user_id: localStorage.getItem('token'),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          this.alert
            .customComfirmationAlert('Create Account','Are you sure to create this account?')
            .then((res) => {
              if (res === 'confirm') {
                this.loading.showLoading();
                this.api.postAddAccount(param).subscribe((res) => {
                  this.loading.hide();
                  if (res.status_code === 200) {
                    this.toast.customToast('Account successfully created.',4000,'success');
                    this.modalController.dismiss(true);
                  } else {
                    this.toast.customToast(res.msg || 'Something went wrong.',3000,'warning');
                  }
                });
              }
            });
        } else {
          this.alert.customAlert('Warning','Please enter all the required information');
        }
        break;

      //add transaction
      case 2:
        if ( this.params.transaction_amount && this.params.transaction_category && this.params.accounts && this.params.transaction_type ) {
          const temp = this.params.transaction_category
          this.alert.customComfirmationAlert('Create Record','Are you sure to create this record?').then((res) => {
            if (res == 'confirm') {
              this.params.transaction_category = this.params.transaction_category.name
              param = {
                ...this.params,
                user_id: localStorage.getItem('token'),
              };

              this.loading.showLoading();
              this.api.postAddTransaction(param).subscribe((res) => {
                this.loading.hide();
                if (res.status_code === 200) {
                  this.toast.customToast('Account successfully created.',4000,'success'
                  );
                  this.modalController.dismiss(true);
                } else {
                  this.params.transaction_category = temp
                  this.toast.customToast(res.msg || 'Something went wrong.',3000,'warning'
                  );
                }
              });
            }
          });
        } else {
          this.toast.customToast('Please enter all the required information',1000,'warning',)
        }

        break;

      //add budget
      case 3:
        //single budget
        if(this.selectedSegment == 'first') {
          if (this.params1.budget_name && this.params1.budget_type && this.params1.accounts && this.params1.amount) {
            param = {
              ...this.params1,
              user_id: localStorage.getItem('token'),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
            console.log(param);
  
            this.alert
              .customComfirmationAlert(
                'Create Budget',
                'Are you sure to create this budget?'
              )
              .then((res) => {
                if (res === 'confirm') {
                  this.loading.showLoading();
                  this.api.postAddBudget(param).subscribe((res) => {
                    this.loading.hide();
                    if (res.status_code === 200) {
                      this.toast.customToast(
                        'Budget successfully created.',
                        4000,
                        'success'
                      );
                      this.modalController.dismiss(true);
                    } else {
                      this.toast.customToast(
                        res.msg || 'Something went wrong.',
                        3000,
                        'warning'
                      );
                    }
                  });
                }
              });

          }else {
            this.alert.customAlert(
              'Warning',
              'Please enter all the required information'
            );
          }
        }
        
        //split budget
        if(this.selectedSegment == 'second') {
          if (this.params2.prefix && this.params2.amount &&this.params2.needs_percent && this.params2.wants_percent && this.params2.savings_percent && this.params2.accounts) {
            param = {
              ...this.params2,
              user_id: localStorage.getItem('token'),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
            console.log(param);
  
            this.alert
              .customComfirmationAlert(
                'Create Budget',
                'Are you sure to create this budget?'
              )
              .then((res) => {
                if (res === 'confirm') {
                  this.loading.showLoading();
                  this.api.postAddSplitBudget(param).subscribe((res) => {
                    this.loading.hide();
                    if (res.status_code === 200) {
                      this.toast.customToast(
                        'Budget successfully created.',
                        4000,
                        'success'
                      );
                      this.modalController.dismiss(true);
                    } else {
                      this.toast.customToast(
                        res.msg || 'Something went wrong.',
                        3000,
                        'warning'
                      );
                    }
                  });
                }
              });

          }else {
            this.alert.customAlert(
              'Warning',
              'Please enter all the required information'
            );
          }
        }

        break;
      
      default:
        this.alert.customAlert('Error', 'Invalid operation');
        break;
    }
  }

  getCategory(values: any) {
    const value = values.detail.value;
    this.disabled = false;

    if (value == 'income') {
      this.label = 'Income';
      this.categories = this.income;
    } else if (value == 'expense') {
      this.label = 'Expense';
      this.categories = this.expense;
    }
  }

  segmentChanged(event: any) {
    if (event?.detail?.value) {
      this.selectedSegment = event.detail.value;
    }
  }

  allowChanges() {
    this.percent_disabled = !this.percent_disabled;
  }

  setDate(event: any, popover: IonPopover) {
    this.params.transaction_date = event.detail.value;
    popover.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getLocalIsoString(): string {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, 19);
    return localISOTime;
  }

  setNature(event:any){
    this.params.sub_category = event.detail.value.sub_category
    console.log(this.params.sub_category,this.params.transaction_category)
  }
}
