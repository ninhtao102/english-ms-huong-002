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
import { HomeworkSubmissionService } from '@shared/service/homework-submission.service';
import { HomeworkService } from '@shared/service/homework.service';
import { PersonsDto } from '@shared/model/persons.model';
import { UserService } from '@app/core/user/user.service';

@Component({
    selector: 'app-homeworks-detail',
    templateUrl: './homeworks-detail.component.html',
    styleUrls: ['./homeworks-detail.component.scss']
})
export class HomeworksDetailComponent implements OnInit, AfterViewInit {

    @ViewChild('homeworkSteps', { static: true }) homeworkSteps: MatTabGroup;
    currentStep: number = 0;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    // private _unsubscribeAll: Subject<any> = new Subject<any>();

    currentUser: any;
    id: number | null = null;
    detail: HomeworksDto = null;
    titlePage: string = '';
    readonly: boolean = false;
    photo: File | null = null;
    listQuestions: QuestionsDto[] = [];
    listClasses: ClassesDto[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private form: FormBuilder,
        private _userService: UserService,
        private classesService: ClassesService,
        private homeworkService: HomeworkService,
        private homeworkAssignmentService: HomeworkAssignmentService,
        private homeworkSubmissionService: HomeworkSubmissionService,
        private questionsService: QuestionsService,
        private answersService: AnswersService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.currentUser = this._userService.currentUser;
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

        this.homeworkService.getDetail(id, this.currentUser.username).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.detail = response.body;

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
    }

    goToStep(questionIndex: number): void {
        this.currentStep = questionIndex;
        this.homeworkSteps.selectedIndex = this.currentStep;
    }

    goToPreviousQuestion(): void {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.homeworkSteps.selectedIndex = this.currentStep;
        }
    }

    goToNextQuestion(): void {
        if (this.currentStep < this.detail?.questions.length - 1) {
            this.currentStep++;
            this.homeworkSteps.selectedIndex = this.currentStep;
        }
    }

}
