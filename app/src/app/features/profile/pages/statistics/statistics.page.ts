import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
    barChartOutline, pieChartOutline, trendingUpOutline,
    chevronBackOutline, timeOutline, alertCircleOutline,
    checkmarkCircleOutline, carOutline, walletOutline,
    speedometerOutline, warningOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.page.html',
    styleUrls: ['./statistics.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DecimalPipe,
        IonicModule
    ]
})
export class StatisticsPage implements OnInit {
    private location = inject(Location);

    selectedPeriod = 'week';

    constructor() {
        addIcons({
            barChartOutline, pieChartOutline, trendingUpOutline,
            chevronBackOutline, timeOutline, alertCircleOutline,
            checkmarkCircleOutline, carOutline, walletOutline,
            speedometerOutline, warningOutline
        });
    }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event.detail.value;
    }
}
