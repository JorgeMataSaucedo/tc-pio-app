import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  home,
  walletOutline,
  wallet,
  documentTextOutline,
  documentText,
  personOutline,
  person,
} from 'ionicons/icons';

/**
 * Página de navegación por Tabs - SPIO
 * Contiene la barra de navegación inferior con acceso a las secciones principales
 */
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  constructor() {
    addIcons({
      homeOutline,
      home,
      walletOutline,
      wallet,
      documentTextOutline,
      documentText,
      personOutline,
      person,
    });
  }
}
