import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';
import { MatTabGroup } from '@angular/material/tabs';
import { HomeworksDto } from '@shared/model/homeworks.model';
import { ClassesDto } from '@shared/model/classes.model';
import { QuestionsDto } from '@shared/model/questions.model';
import { ClassesService } from '@shared/service/classes.service';
import { HomeworkAssignmentService } from '@shared/service/homework-assignment.service';
import { QuestionsService } from '@shared/service/questions.service';
import { AnswersService } from '@shared/service/answers.service';

@Component({
    selector: 'app-homeworks-detail',
    templateUrl: './homeworks-detail.component.html',
    styleUrls: ['./homeworks-detail.component.scss']
})
export class HomeworksDetailComponent implements OnInit, AfterViewInit {

    @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
    categories: any[];
    course: any;
    currentStep: number = 0;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    // private _unsubscribeAll: Subject<any> = new Subject<any>();


    homework: HomeworksDto;

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
        private classesService: ClassesService,
        private homeworkAssignmentService: HomeworkAssignmentService,
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

        this.homeworkAssignmentService.get(id).subscribe({
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
                this.toast.actionFailed('common.getDetail', 'homeworks.field', err.message);
            }
        });
    }

    onBack(): void {
        this.router.navigate(['/homeworks']);
    }

    onSave(): void {
        if (this.formDetail.invalid) {
            return;
        }

        const payload = this.formDetail.value;
        this.homeworkAssignmentService.save(payload).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.toast.actionSuccess('common.save', 'homeworks.field');
                }
            },
            error: (err) => {
                console.error('Save failed:', err);
                this.toast.actionFailed('common.save', 'homeworks.field', err.message);
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

    getClassName(classId: number): string {
        const foundClass = this.listClasses.find(cls => cls.id === classId);
        return foundClass ? foundClass.className : '';
    }





    goToPreviousQuestion(): void {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.courseSteps.selectedIndex = this.currentStep;
        }
    }

    goToNextQuestion(): void {
        if (this.currentStep < this.course.steps.length - 1) {
            this.currentStep++;
            this.courseSteps.selectedIndex = this.currentStep;
        }
    }

}
