import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { BaseListComponent } from '@shared/base-list/base-list.component';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';
import { ClassesDto } from '@shared/model/classes.model';
import { HomeworksDto, LIST_QUESTION_TYPES } from '@shared/model/homeworks.model';
import { PersonsDto } from '@shared/model/persons.model';
import { ClassesService } from '@shared/service/classes.service';
import { HomeworkAssignmentService } from '@shared/service/homework-assignment.service';
import { HomeworkSubmissionService } from '@shared/service/homework-submission.service';
import { PersonsService } from '@shared/service/persons.service';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';


@Component({
    selector: 'app-submissions-list',
    templateUrl: './submissions-list.component.html',
    styleUrls: ['./submissions-list.component.scss']
})
export class SubmissionsListComponent extends BaseListComponent implements OnInit {

    questionTypeOptions = LIST_QUESTION_TYPES;
    displayedColumns: string[] = ['position', 'title', 'className', 'assignedDate', 'dueDate', 'createdDate', 'actions'];
    listHomeworks: HomeworksDto[] = [];
    listClasses: ClassesDto[] = [];
    listStudents: PersonsDto[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private form: FormBuilder,
        private dialog: MatDialog,
        private homeworkAssignmentService: HomeworkAssignmentService,
        private homeworkSubmissionService: HomeworkSubmissionService,
        private classesService: ClassesService,
        private personsService: PersonsService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
        private router: Router,
    ) {
        super();
        this.filter = this.form.group({
            homeworkId: [''],
            classId: [''],
            studentId: [''],
            dueDateFrom: [],
            dueDateTo: [],
            submittedAtFrom: [],
            submittedAtTo: [],
            pageIndex: [0],
            pageSize: [10],
        });
        this.getHomeworks();
        this.getClasses();
        this.getStudents();
    }

    ngOnInit(): void {
        this.basePath = '/submissions';
        this.tableSource = new MatTableDataSource([]);
        this.searchHandler();
    }

    getHomeworks(): void {
        this.homeworkAssignmentService.search({ pageIndex: 0, pageSize: 100 }).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.listHomeworks = response.body.content;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Search failed:', err);
                this.toast.actionFailed('common.search', 'homeworks.field', err.message);
            }
        });
    }

    getClasses(): void {
        this.classesService.search({ pageIndex: 0, pageSize: 100 }).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.listClasses = response.body.content;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Search failed:', err);
                this.toast.actionFailed('common.search', 'classes.field', err.message);
            }
        });
    }


    getStudents(): void {
        this.personsService.search({ classId: this.filter.value.classId || null, type: 2, pageIndex: 0, pageSize: 100 }).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.listStudents = response.body.content;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Search failed:', err);
                this.toast.actionFailed('common.search', 'persons.field', err.message);
            }
        });
    }

    searchHandler(): void {
        const searchParams = this.filter.value;
        this.homeworkSubmissionService.search(searchParams).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    this.tableSource.data = response.body.content;
                    this.totalElements = response.body.totalElements;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Search failed:', err);
                this.toast.actionFailed('common.search', 'submissions.field', err.message);
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

    onRouteDetail(type: string, id: string = '0'): void {
        this.router.navigate([`${this.basePath}/${type}/${id}`]);
    }

}
