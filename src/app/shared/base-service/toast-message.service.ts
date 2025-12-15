import { Injectable } from '@angular/core';
import { FuseAlertType } from '@fuse/components/alert/public-api';
import { TranslocoService } from '@ngneat/transloco';
import { timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastMessageService {

    alert: { type: FuseAlertType; title: string; message: string } = {
        type: 'success',
        title: '',
        message: '',
    };
    showAlert: boolean = false;

    constructor(
        private transloco: TranslocoService
    ) { }

    actionSuccess(action: string, field: string): void {
        this.timerHideAlert(3000);
        this.alert.type = 'success';
        this.alert.title = this.transloco.translate('common.actionFieldSuccessfully', { action: this.transloco.translate(action), field: this.transloco.translate(field) });
        this.showAlert = true;
    }

    actionFailed(action: string, field: string, message: string = ''): void {
        this.timerHideAlert(3000);
        let title
        if (message === '') {
            title = this.transloco.translate('common.error');
            message = this.transloco.translate('common.actionFieldFailed', { action: this.transloco.translate(action), field: this.transloco.translate(field) });
        } else {
            this.alert.title = this.transloco.translate('common.actionFieldFailed', { action: this.transloco.translate(action), field: this.transloco.translate(field) });
            this.alert.message = message;
        }
        this.setToast('error', title, message);
        this.showAlert = true;
    }

    success(title: string, message: string): void {
        this.setToast('success', title, message);
    }

    info(message: string, title: string = 'common.info'): void {
        this.setToast('info', title, message);
    }

    warning(message: string, title: string = 'common.warning'): void {
        this.setToast('warning', title, message);
    }

    error(message: string, title: string = 'common.error'): void {
        this.setToast('error', title, message);
    }

    setToast(alertType: FuseAlertType, title: string, message: string): void {
        this.timerHideAlert(3000);
        this.alert.type = alertType;
        if (title) {
            this.alert.title = this.transloco.translate(title);
        }
        if (message) {
            this.alert.message = this.transloco.translate(message);
        }
        this.showAlert = true;
    }

    timerHideAlert(milliseconds: number): void {
        timer(milliseconds).subscribe(() => {
            this.showAlert = false;
        });
    }

}
