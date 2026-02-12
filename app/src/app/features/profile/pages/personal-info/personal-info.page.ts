import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
    personOutline, idCardOutline, callOutline, mailOutline,
    homeOutline, calendarOutline, chevronBackOutline,
    briefcaseOutline, busOutline, shieldCheckmarkOutline,
    warningOutline
} from 'ionicons/icons';
import { ProfileMockService } from '../../../../core/services/profile.mock.service';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.page.html',
    styleUrls: ['./personal-info.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DatePipe,
        IonicModule
    ]
})
export class PersonalInfoPage implements OnInit {
    private location = inject(Location);
    private profileService = inject(ProfileMockService);

    profile = signal<any>(null);

    // Computed helpers for template
    basicInfo = computed(() => this.profile()?.basic);
    contactInfo = computed(() => this.profile()?.contact);
    employmentInfo = computed(() => this.profile()?.employment);

    constructor() {
        addIcons({
            personOutline, idCardOutline, callOutline, mailOutline,
            homeOutline, calendarOutline, chevronBackOutline,
            briefcaseOutline, busOutline, shieldCheckmarkOutline
        });
    }

    ngOnInit() {
        this.profileService.getExtendedProfile().subscribe(data => {
            this.profile.set(data);
        });
    }

    goBack() {
        this.location.back();
    }
}
