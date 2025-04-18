import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonButtons, IonToolbar, IonTitle, IonMenuButton } from "@ionic/angular/standalone";    

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonTitle, IonToolbar, IonButtons, IonHeader, IonMenuButton],
})
export class HeaderComponent  implements OnInit {

  @Input() title:any
  constructor() { }

  ngOnInit() {}

}
  