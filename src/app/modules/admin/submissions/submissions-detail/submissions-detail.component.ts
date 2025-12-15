import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';
import { ClassesDto } from '@shared/model/classes.model';
import { QuestionsDto } from '@shared/model/questions.model';
import { AnswersService } from '@shared/service/answers.service';
import { ClassesService } from '@shared/service/classes.service';
import { HomeworkSubmissionService } from '@shared/service/homework-submission.service';
import { QuestionsService } from '@shared/service/questions.service';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';

@Component({
    selector: 'app-submissions-detail',
    templateUrl: './submissions-detail.component.html',
    styleUrls: ['./submissions-detail.component.scss']
})
export class SubmissionsDetailComponent implements OnInit, AfterViewInit {

    id: number | null = null;
    detail: any = null;
    typePage: string = '';
    titlePage: string = '';
    readonly: boolean = false;
    formDetail: FormGroup = this.form.group({
        id: [],
        title: [{ value: '', disabled: this.readonly || this.typePage === 'detail' }, Validators.required],
        description: [{ value: '', disabled: this.readonly || this.typePage === 'detail' }],
        classId: [{ value: '', disabled: this.readonly || this.typePage === 'detail' }, Validators.required],
        assignedDate: [{ value: new Date(), disabled: this.readonly || this.typePage === 'detail' }],
        dueDate: [{ value: '', disabled: this.readonly || this.typePage === 'detail' }],
        questions: [[]],
    });
    photo: File | null = null;
    listQuestions: QuestionsDto[] = [];
    listClasses: ClassesDto[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private form: FormBuilder,
        private homeworkSubmissionService: HomeworkSubmissionService,
        private classesService: ClassesService,
        private questionsService: QuestionsService,
        private answersService: AnswersService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const type = this.route.snapshot.paramMap.get('type');
        this.typePage = type ? type : '';
        if (this.typePage === 'detail') {
            this.titlePage = 'common.view';
            this.readonly = true;
        } else if (this.typePage === 'create') {
            this.titlePage = 'common.add';
        } else if (this.typePage === 'update') {
            this.titlePage = 'common.edit';
        }
        const detailId = this.route.snapshot.paramMap.get('id');
        this.id = (detailId && detailId !== '0') ? +detailId : null;
        this.getListQuestions();
        this.getListClasses();
    }

    ngOnInit(): void {
        if (this.id) {
            this.getDetail(this.id);
        }
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    getListQuestions(): void {
        this.questionsService.search({ pageIndex: 0, pageSize: 100 }).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.listQuestions = response.body.content;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Get questions failed:', err);
                this.toast.actionFailed('common.get', 'questions.field', err.message);
            }
        });
    }

    getListClasses(): void {
        this.classesService.search({ pageIndex: 0, pageSize: 100 }).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.listClasses = response.body.content;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Get classes failed:', err);
                this.toast.actionFailed('common.get', 'classes.field', err.message);
            }
        });
    }

    getDetail(id: number): void {
        if (!id) {
            return;
        }

        this.homeworkSubmissionService.get(id).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.detail = response.body;
                    this.formDetail.patchValue({
                        id: this.id,
                        title: response.body.title,
                        description: response.body.description,
                        classId: response.body.classId,
                        assignedDate: new Date(response.body.assignedDate),
                        dueDate: new Date(response.body.dueDate),
                        questions: response.body.questions,
                    });
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Get detail failed:', err);
                this.toast.actionFailed('common.getDetail', 'submissions.field', err.message);
            }
        });
    }

    onBack(): void {
        this.router.navigate(['/submissions']);
    }

    onSave(): void {
        if (this.formDetail.invalid) {
            return;
        }

        const payload = this.formDetail.value;
        this.homeworkSubmissionService.save(payload).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.toast.actionSuccess('common.save', 'submissions.field');
                    this.onBack();
                }
            },
            error: (err) => {
                console.error('Save failed:', err);
                this.toast.actionFailed('common.save', 'submissions.field', err.message);
            }
        });
    }

    onPreview(): void { }

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

    updateCurrentQuestions(question: QuestionsDto): void {
        const currentQuestions = this.formDetail.value.questions as QuestionsDto[];
        const questionIndex = currentQuestions.findIndex(q => q.id === question.id);
        if (questionIndex !== -1) {
            currentQuestions[questionIndex] = question;
        }
        this.formDetail.patchValue({ questions: currentQuestions });
    }

    openDialogDeleteQuestion(row: QuestionsDto): void {
        this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: this.transloco.translate('common.confirmDeletion'),
                message: this.transloco.translate('common.areYouSureToDelete', { field: this.transloco.translate('submissions.questionField'), value: row.questionText })
            }
        }).afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                if (row.id) {
                    this.questionsService.delete(row.id).subscribe({
                        next: (response) => {
                            if (response.code === RESPONSE_CODE_SUCCESS) {
                                this.toast.actionSuccess('common.delete', 'submissions.questionField');
                            }
                            this.removeCurrentQuestion(row.id);
                        },
                        error: (err) => {
                            console.error('Delete failed:', err);
                            this.toast.actionFailed('common.delete', 'submissions.questionField', err.message);
                        }
                    });
                }
            }
        });
    }

    removeCurrentQuestion(id: number): void {
        const currentQuestions = this.formDetail.value.questions as QuestionsDto[];
        const updatedQuestions = currentQuestions.filter(q => q.id !== id);
        this.formDetail.patchValue({ questions: updatedQuestions });
    }

    getClassName(classId: number): string {
        const foundClass = this.listClasses.find(cls => cls.id === classId);
        return foundClass ? foundClass.className : '';
    }

}
