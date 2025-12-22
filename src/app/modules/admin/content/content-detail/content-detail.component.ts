import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ContentDto } from '@shared/model/content.model';
import { ContentService } from '@shared/service/content.service';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';

@Component({
    selector: 'app-content-detail',
    templateUrl: './content-detail.component.html',
    styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit, AfterViewInit {

    id: number | null = null;
    detail: ContentDto = null;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    constructor(
        private cdr: ChangeDetectorRef,
        private contentService: ContentService,
        private toast: ToastMessageService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const detailId = this.route.snapshot.paramMap.get('id');
        this.id = detailId ? +detailId : null;
    }

    ngOnInit(): void {
        if (this.id) {
            this.getDetail(this.id);
        } else {
            this.onBack();
        }
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    getDetail(id: number): void {
        this.contentService.get(id).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.detail = response.body;
                    this.cdr.detectChanges();
                } else {
                    this.toast.actionFailed('common.get', 'content.field', response.message);
                    this.onBack();
                }
            },
            error: (err) => {
                console.error('Get detail failed:', err);
                this.toast.actionFailed('common.get', 'content.field', err.message);
                this.onBack();
            }
        });
    }

    onBack(): void {
        this.router.navigate(['/content']);
    }

}
