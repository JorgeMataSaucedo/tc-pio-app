import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline, keyOutline, shieldCheckmarkOutline,
  fingerPrintOutline, lockClosedOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SecurityPage {
  private location = inject(Location);
  constructor() {
    addIcons({ chevronBackOutline, keyOutline, shieldCheckmarkOutline, fingerPrintOutline, lockClosedOutline });
  }
  goBack() { this.location.back(); }
}
