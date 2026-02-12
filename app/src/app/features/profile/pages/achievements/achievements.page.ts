import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
    trophyOutline, starOutline, ribbonOutline, medalOutline,
    lockClosedOutline, chevronBackOutline, flagOutline,
    speedometerOutline, waterOutline, shieldCheckmarkOutline,
    timeOutline
} from 'ionicons/icons';
import { ProfileMockService } from '../../../../core/services/profile.mock.service';
import { IAchievement } from '../../../../models/profile.model';

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.page.html',
    styleUrls: ['./achievements.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DecimalPipe,
        IonicModule
    ]
})
export class AchievementsPage implements OnInit {
    private location = inject(Location);
    private profileService = inject(ProfileMockService);

    achievements = signal<IAchievement[]>([]);
    unlockedCount = signal<number>(0);
    totalCount = signal<number>(0);
    progressPercent = signal<number>(0);

    constructor() {
        addIcons({
            trophyOutline, starOutline, ribbonOutline, medalOutline,
            lockClosedOutline, chevronBackOutline, flagOutline,
            speedometerOutline, waterOutline, shieldCheckmarkOutline,
            timeOutline
        });
    }

    ngOnInit() {
        this.profileService.getAchievements().subscribe(data => {
            this.achievements.set(data);
            this.calculateProgress(data);
        });
    }

    calculateProgress(data: IAchievement[]) {
        this.totalCount.set(data.length);
        const unlocked = data.filter(a => a.isUnlocked).length;
        this.unlockedCount.set(unlocked);
        this.progressPercent.set(data.length > 0 ? unlocked / data.length : 0);
    }

    goBack() {
        this.location.back();
    }
}
