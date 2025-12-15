import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-base-detail',
    templateUrl: './base-detail.component.html',
    styleUrls: ['./base-detail.component.scss']
})
export class BaseDetailComponent {

    formDetail: FormGroup;
    readonly: boolean = false;

    constructor(
    ) { }

    hasError(controlName: string, errorType: string): boolean {
        const control = this.formDetail.get(controlName);
        return !!(control && control.invalid && control.touched && control.errors?.[errorType]);
    }

    trimValue(controlName: string): void {
        const control = this.formDetail?.get(controlName);
        if (control && typeof control.value === 'string') {
            control.setValue(control.value.trim());
        }
    }

}
