import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { BaseListComponent } from '@shared/base-list/base-list.component';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ContentDto } from '@shared/model/content.model';
import { ContentService } from '@shared/service/content.service';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent extends BaseListComponent implements OnInit {

    contents: ContentDto[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private form: FormBuilder,
        private contentService: ContentService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
        private router: Router,
    ) {
        super();
        this.filter = this.form.group({
            keyword: [''],
            pageIndex: [0],
            pageSize: [30],
        });
    }

    ngOnInit(): void {
        this.basePath = '/content';
        this.tableSource = new MatTableDataSource([]);
        this.searchHandler();
    }

    searchHandler(): void {
        const searchParams = this.filter.value;
        this.contentService.search(searchParams).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.contents = response.body.content;
                    this.tableSource.data = response.body.content;
                    this.totalElements = response.body.totalElements;
                    this.cdr.detectChanges();
                } else {
                    this.contents = [];
                    this.tableSource.data = [];
                    this.totalElements = 0;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Search failed:', err);
                this.toast.actionFailed('common.search', 'content.field', err.message);
            }
        });
    }

    onChangePage(event: any): void {
        this.filter.patchValue({
            pageIndex: event.pageIndex,
            pageSize: event.pageSize
        });
        this.searchHandler();
    }

    onRouteDetail(id: number): void {
        this.router.navigate([`${this.basePath}/${id}`]);
    }

}
