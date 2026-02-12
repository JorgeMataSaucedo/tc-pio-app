import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonText,
    IonButton,
    IonButtons,
    IonBadge,
    IonNote,
    IonRefresher,
    IonRefresherContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    notificationsOutline,
    documentTextOutline,
    trophyOutline,
    walletOutline,
    warningOutline,
    checkmarkCircleOutline,
    timeOutline,
    chevronBackOutline
} from 'ionicons/icons';
import { Location } from '@angular/common';

interface INotification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    category: 'system' | 'wallet' | 'documents' | 'achievements';
    date: Date;
    read: boolean;
    icon: string;
}

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DatePipe,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        IonText,
        IonButton,
        IonButtons,
        IonBadge,
        IonNote,
        IonRefresher,
        IonRefresherContent
    ]
})
export class NotificationsPage implements OnInit {
    private location = inject(Location);

    notifications = signal<INotification[]>([]);

    constructor() {
        addIcons({
            notificationsOutline,
            documentTextOutline,
            trophyOutline,
            walletOutline,
            warningOutline,
            checkmarkCircleOutline,
            timeOutline,
            chevronBackOutline
        });
    }

    ngOnInit() {
        this.loadNotifications();
    }

    loadNotifications() {
        // Mock Data
        const mockData: INotification[] = [
            {
                id: '1',
                title: '¡Nuevo Logro Desbloqueado!',
                message: 'Felicidades, has desbloqueado "Rey de la Carretera" por completar 100 viajes sin incidentes.',
                type: 'success',
                category: 'achievements',
                date: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
                read: false,
                icon: 'trophy-outline'
            },
            {
                id: '2',
                title: 'Documento por Vencer',
                message: 'Tu Licencia Federal vence en 15 días. Por favor tunrnate a renovación.',
                type: 'warning',
                category: 'documents',
                date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
                read: false,
                icon: 'document-text-outline'
            },
            {
                id: '3',
                title: 'Depósito Recibido',
                message: 'Se ha depositado tu nómina correspondiente a la semana 42.',
                type: 'info',
                category: 'wallet',
                date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                read: true,
                icon: 'wallet-outline'
            },
            {
                id: '4',
                title: 'Mantenimiento Programado',
                message: 'El sistema estará en mantenimiento el domingo de 2:00 AM a 4:00 AM.',
                type: 'info',
                category: 'system',
                date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
                read: true,
                icon: 'notifications-outline'
            }
        ];

        this.notifications.set(mockData);
    }

    goBack() {
        this.location.back();
    }

    markAsRead(id: string) {
        this.notifications.update(notes =>
            notes.map(n => n.id === id ? { ...n, read: true } : n)
        );
    }

    handleRefresh(event: any) {
        setTimeout(() => {
            this.loadNotifications();
            event.target.complete();
        }, 1500);
    }

    getIconColor(type: string): string {
        switch (type) {
            case 'success': return 'success';
            case 'warning': return 'warning';
            case 'error': return 'danger';
            default: return 'primary';
        }
    }
}
