import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
    chevronBackOutline, callOutline, mailOutline,
    helpCircleOutline, chatbubblesOutline, headsetOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [CommonModule, IonicModule],
    template: `
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button (click)="goBack()">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Ayuda y Soporte</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div style="text-align: center; margin: 30px 0;">
                <ion-icon name="headset-outline" style="font-size: 64px; color: #999; opacity: 0.5;"></ion-icon>
                <h3 style="margin-top: 16px; font-weight: 700;">Como podemos ayudarte?</h3>
                <p style="color: #888;">Estamos disponibles 24/7</p>
            </div>

            <ion-list lines="none" style="background: transparent;">
                <ion-item style="--background: #fff; --border-radius: 12px; margin-bottom: 12px; --padding-start: 16px;">
                    <ion-icon name="call-outline" slot="start" color="primary" style="font-size: 24px;"></ion-icon>
                    <ion-label>
                        <h3 style="font-weight: 600;">Llamar a Central</h3>
                        <p>800-123-4567</p>
                    </ion-label>
                </ion-item>

                <ion-item style="--background: #fff; --border-radius: 12px; margin-bottom: 12px; --padding-start: 16px;">
                    <ion-icon name="chatbubbles-outline" slot="start" color="success" style="font-size: 24px;"></ion-icon>
                    <ion-label>
                        <h3 style="font-weight: 600;">Chat de Soporte</h3>
                        <p>Respuesta inmediata</p>
                    </ion-label>
                </ion-item>

                <ion-item style="--background: #fff; --border-radius: 12px; margin-bottom: 12px; --padding-start: 16px;">
                    <ion-icon name="mail-outline" slot="start" color="warning" style="font-size: 24px;"></ion-icon>
                    <ion-label>
                        <h3 style="font-weight: 600;">Enviar Correo</h3>
                        <p>soporte&#64;tc.com.mx</p>
                    </ion-label>
                </ion-item>

                <ion-item style="--background: #fff; --border-radius: 12px; margin-bottom: 12px; --padding-start: 16px;">
                    <ion-icon name="help-circle-outline" slot="start" color="tertiary" style="font-size: 24px;"></ion-icon>
                    <ion-label>
                        <h3 style="font-weight: 600;">Preguntas Frecuentes</h3>
                        <p>Consulta las dudas mas comunes</p>
                    </ion-label>
                </ion-item>
            </ion-list>

            <div style="text-align: center; margin-top: 40px; padding: 20px;">
                <p style="color: #aaa; font-size: 12px;">Horario de atencion: Lunes a Viernes 8:00 - 18:00</p>
                <p style="color: #aaa; font-size: 12px;">soporte&#64;transportescuauhtemoc.com</p>
            </div>
        </ion-content>
    `
})
export class HelpPage {
    private location = inject(Location);
    constructor() {
        addIcons({ chevronBackOutline, callOutline, mailOutline, helpCircleOutline, chatbubblesOutline, headsetOutline });
    }
    goBack() { this.location.back(); }
}
