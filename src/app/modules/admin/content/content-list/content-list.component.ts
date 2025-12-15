import { TranslocoService } from '@ngneat/transloco';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseListComponent } from '@shared/base-list/base-list.component';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';
import { ContentService } from '../../../../shared/service/content.service';
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { ContentDto } from '../../../../shared/model/content.model';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent extends BaseListComponent implements OnInit {

    displayedColumns: string[] = ['position', 'name', 'createdDate', 'actions'];

    constructor(
        private cdr: ChangeDetectorRef,
        private form: FormBuilder,
        private dialog: MatDialog,
        private contentService: ContentService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
    ) {
        super();
        this.filter = this.form.group({
            keyword: [''],
            pageIndex: [0],
            pageSize: [10],
        });
    }

    ngOnInit(): void {
        this.tableSource = new MatTableDataSource([]);
        this.searchHandler();
    }

    searchHandler(): void {
        const searchParams = this.filter.value;
        this.contentService.search(searchParams).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.tableSource.data = response.body.content;
                    this.totalElements = response.body.totalElements;
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

    openDialogAdd(): void {
        const dialogRef = this.dialog.open(ContentDetailComponent, {
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.toast.actionSuccess('common.add', 'content.field');
                this.searchHandler();
            }
        });
    }

    openDialogView(row: ContentDto): void {
        this.dialog.open(ContentDetailComponent, {
            width: '600px',
            data: { formDetail: row, readonly: true }
        });
    }

    openDialogEdit(row: ContentDto): void {
        const dialogRef = this.dialog.open(ContentDetailComponent, {
            width: '600px',
            data: { formDetail: row, readonly: false }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.toast.actionSuccess('common.edit', 'content.field');
                this.searchHandler();
            }
        });
    }

    openDialogDelete(row: ContentDto): void {
        this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: this.transloco.translate('common.confirmDeletion'),
                message: this.transloco.translate('common.areYouSureToDelete', { field: this.transloco.translate('content.field'), value: row.name })
            }
        }).afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.contentService.delete(row.id).subscribe({
                    next: (response) => {
                        if (response.code === RESPONSE_CODE_SUCCESS) {
                            this.toast.actionSuccess('common.delete', 'content.field');
                        }
                        this.searchHandler();
                    },
                    error: (err) => {
                        console.error('Delete failed:', err);
                        this.toast.actionFailed('common.delete', 'content.field', err.message);
                    }
                });
            }
        });
    }

}
