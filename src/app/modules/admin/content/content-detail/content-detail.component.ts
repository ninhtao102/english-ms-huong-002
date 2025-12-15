import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';
import { ContentService } from '../../../../shared/service/content.service';

@Component({
    selector: 'app-content-detail',
    templateUrl: './content-detail.component.html',
    styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit, AfterViewInit {

    formDetail: FormGroup;
    readonly: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ContentDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private form: FormBuilder,
        private contentService: ContentService,
        private cdr: ChangeDetectorRef,
        private toast: ToastMessageService,
    ) {
        if (data && data.formDetail) {
            this.formDetail = data.formDetail;
        }
        this.readonly = data?.readonly || false;
    }

    ngOnInit(): void {
        if (this.data && this.data.formDetail && this.data.formDetail.id) {
            this.formDetail = this.form.group({
                id: [this.data.formDetail.id],
                code: [{ value: this.data.formDetail.code, disabled: this.readonly }, [Validators.required, Validators.maxLength(20)]],
                name: [{ value: this.data.formDetail.name, disabled: this.readonly }, [Validators.required, Validators.maxLength(255)]],
                description: [{ value: this.data.formDetail.description, disabled: this.readonly }, Validators.maxLength(500)],
                shortDescription: [{ value: this.data.formDetail.shortDescription, disabled: this.readonly }, Validators.maxLength(500)],
            });
            this.getDetail(this.data.formDetail.id);
        } else {
            this.getDetail(null);
        }
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    getDetail(id: number): void {
        if (!id) {
            this.formDetail = this.form.group({
                id: [],
                code: ['', [Validators.required, Validators.maxLength(20)]],
                name: ['', [Validators.required, Validators.maxLength(255)]],
                description: ['', Validators.maxLength(500)],
                shortDescription: ['', Validators.maxLength(500)],
            });
            this.cdr.detectChanges();
            return;
        }

        this.contentService.get(id).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    setTimeout(() => {
                        this.formDetail = this.form.group({
                            id: [id],
                            code: [{ value: response.body.code, disabled: this.readonly }, [Validators.required, Validators.maxLength(20)]],
                            name: [{ value: response.body.name, disabled: this.readonly }, [Validators.required, Validators.maxLength(255)]],
                            description: [{ value: response.body.description, disabled: this.readonly }, Validators.maxLength(500)],
                            shortDescription: [{ value: response.body.shortDescription, disabled: this.readonly }, Validators.maxLength(500)],
                        });
                    }, 100);
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Get detail failed:', err);
                this.toast.actionFailed('common.getDetail', 'content.field', err.message);
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.formDetail.invalid) {
            return;
        }
        const payload = this.formDetail.value;

        this.contentService.save(payload).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.dialogRef.close(this.formDetail.value);
                }
            },
            error: (err) => {
                console.error('Save failed:', err);
                this.toast.actionFailed('common.save', 'content.field', err.message);
            }
        });
    }

    hasError(controlName: string, errorType: string): boolean {
        const control = this.formDetail?.get(controlName);
        return !!(control && control.invalid && control.touched && control.errors?.[errorType]);
    }

    trimValue(controlName: string): void {
        const control = this.formDetail?.get(controlName);
        if (control && typeof control.value === 'string') {
            control.setValue(control.value.trim());
        }
    }

}
