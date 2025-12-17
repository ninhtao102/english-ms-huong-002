import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/core/user/user.service';
import { TranslocoService } from '@ngneat/transloco';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ClassesDto } from '@shared/model/classes.model';
import { HomeworksDto } from '@shared/model/homeworks.model';
import { PersonsDto } from '@shared/model/persons.model';
import { QuestionsDto } from '@shared/model/questions.model';
import { ClassesService } from '@shared/service/classes.service';
import { HomeworkService } from '@shared/service/homework.service';
import { PersonsService } from '@shared/service/persons.service';
import { QuestionsService } from '@shared/service/questions.service';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';

@Component({
    selector: 'app-homeworks-detail',
    templateUrl: './homeworks-detail.component.html',
    styleUrls: ['./homeworks-detail.component.scss']
})
export class HomeworksDetailComponent implements OnInit, AfterViewInit {

    @ViewChild('homeworkSteps', { static: true }) homeworkSteps: MatTabGroup;
    currentStep: number = 0;
    countCompleted: number = 0;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    // private _unsubscribeAll: Subject<any> = new Subject<any>();

    person: PersonsDto = null;
    id: number | null = null;
    detail: HomeworksDto = null;
    titlePage: string = '';
    readonly: boolean = false;
    photo: File | null = null;
    listQuestions: QuestionsDto[] = [];
    listClasses: ClassesDto[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private _userService: UserService,
        private classesService: ClassesService,
        private homeworkService: HomeworkService,
        private questionsService: QuestionsService,
        private personsService: PersonsService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const currentUser = this._userService.currentUser;
        if (currentUser) {
            this.getPersonByUsername(currentUser.username);
        }
        console.log("🚀 ~ HomeworksDetailComponent ~ constructor ~ currentUser:", currentUser)
        const detailId = this.route.snapshot.paramMap.get('id');
        this.id = (detailId && detailId !== '0') ? +detailId : null;
        this.getListQuestions();
        this.getListClasses();
    }

    ngOnInit(): void {
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

    getPersonByUsername(username: string): void {
        this.personsService.getByUsername(username).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.person = response.body;
                    this.getDetail(this.id);
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Get person failed:', err);
                this.toast.actionFailed('common.get', 'persons.field', err.message);
            }
        });
    }

    getDetail(id: number): void {
        if (!id) {
            return;
        }

        this.homeworkService.getDetail(id, this.person.id).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.detail = response.body;
                    this.detail.questions.forEach((question) => {
                        if (question.questionType === 0 && question.questions) {
                            question.questions.forEach((childQuestion) => {
                                // Get fill blank answers
                                if (childQuestion.questionType === 4) {
                                    childQuestion.studentAnswer = childQuestion.questionText.toUpperCase()
                                        .replace(/\.{3,}|_{3,}/g, '                      ')  // Replace ... or ___ with blanks');
                                }
                            });
                        }
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

    onSave(type: 0 | 1 = 0): void {
        if (!this.detail) {
            return;
        }

        if (type === 1) {
            this.detail.status = 2;
        } else {
            this.detail.status = 1;
        }
        if (this.person) {
            this.detail.studentId = this.person.id;
            this.detail.studentName = this.person.displayName;
        }

        this.homeworkService.save(this.detail).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.toast.actionSuccess('common.save', 'submitField.field');
                    this.onBack();
                }
            },
            error: (err) => {
                console.error('Save failed:', err);
                this.toast.actionFailed('common.save', 'submitField.field', err.message);
            }
        });
    }

    goToStep(questionIndex: number): void {
        this.currentStep = questionIndex;
        this.homeworkSteps.selectedIndex = this.currentStep;
        this.countCompleted = this.detail?.questions.filter(q => q.completed).length || 0;
    }

    goToPreviousQuestion(): void {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.homeworkSteps.selectedIndex = this.currentStep;
        }
        this.countCompleted = this.detail?.questions.filter(q => q.completed).length || 0;
    }

    goToNextQuestion(): void {
        if (this.currentStep < this.detail?.questions.length - 1) {
            this.currentStep++;
            this.homeworkSteps.selectedIndex = this.currentStep;
        }
        this.countCompleted = this.detail?.questions.filter(q => q.completed).length || 0;
    }

    onBlurInputAnswer(parent: QuestionsDto, question: QuestionsDto, studentAnswer: string): void {
        question.studentAnswer = studentAnswer;
        if (question.questionType === 4 && studentAnswer.toLowerCase() === question.questionText.toLowerCase().replace(/\.{3,}|_{3,}/g, '                      ')) {
            question.completed = 0;
            return;
        }
        question.completed = studentAnswer && studentAnswer.trim() !== '' ? 1 : 0;
        this.onFillCompleted(parent);
        this.cdr.detectChanges();
    }

    onChooseAnswer(parent: QuestionsDto, question: QuestionsDto, answerId: number): void {
        question.answerId = answerId;
        question.completed = 1;
        this.onFillCompleted(parent);
        this.cdr.detectChanges();
    }

    onFillCompleted(parent: QuestionsDto): void {
        const questions = parent.questions || [];
        const result = questions.every(q => q.completed);
        parent.completed = result ? 1 : 0;
        this.countCompleted = this.detail?.questions.filter(q => q.completed).length || 0;
        this.cdr.detectChanges();
    }

}
