import { Component, OnInit } from '@angular/core';
import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronUpCircle , document, colorPalette, globe, add} from 'ionicons/icons';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  imports: [IonFabList,  IonFab, IonFabButton, IonIcon],
})
export class FabComponent  implements OnInit {

  constructor() {
    addIcons({chevronUpCircle, document, colorPalette, globe, add});
   }

  ngOnInit() {}

}
