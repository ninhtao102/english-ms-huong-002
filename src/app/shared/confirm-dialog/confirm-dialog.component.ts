import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    title: string = 'Confirm';
    message: string = 'Are you sure you want to proceed?';

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        if (this.data) {
            this.title = this.data.title || this.title;
            this.message = this.data.message || this.message;
        }
        this.cdr.detectChanges();
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

}
