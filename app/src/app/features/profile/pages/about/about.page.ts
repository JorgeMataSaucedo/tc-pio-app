import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AboutPage {
  private location = inject(Location);
  constructor() {
    addIcons({ chevronBackOutline });
  }
  goBack() { this.location.back(); }
}
