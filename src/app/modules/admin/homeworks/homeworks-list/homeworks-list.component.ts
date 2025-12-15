import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { BaseListComponent } from '@shared/base-list/base-list.component';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ClassesDto } from '@shared/model/classes.model';
import { HomeworksDto, LIST_QUESTION_TYPES } from '@shared/model/homeworks.model';
import { ClassesService } from '@shared/service/classes.service';
import { HomeworkAssignmentService } from '@shared/service/homework-assignment.service';


@Component({
    selector: 'app-homeworks-list',
    templateUrl: './homeworks-list.component.html',
    styleUrls: ['./homeworks-list.component.scss']
})
export class HomeworksListComponent extends BaseListComponent implements OnInit {

    homeworks: HomeworksDto[] = [];
    questionTypeOptions = LIST_QUESTION_TYPES;
    listClasses: ClassesDto[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private form: FormBuilder,
        private dialog: MatDialog,
        private homeworkAssignmentService: HomeworkAssignmentService,
        private classesService: ClassesService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
        private router: Router,
    ) {
        super();
        this.filter = this.form.group({
            classId: [''],
            title: [''],
            isOutDate: [false],
            pageIndex: [0],
            pageSize: [30],
        });
        this.getClasses();
    }

    ngOnInit(): void {
        this.basePath = '/homeworks';
        this.tableSource = new MatTableDataSource([]);
        this.searchHandler();
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

    searchHandler(): void {
        const searchParams = this.filter.value;
        this.homeworkAssignmentService.search(searchParams).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body.content)) {
                    // eslint-disable-next-line max-len
                    this.homeworks = response.body.content.map((homework: HomeworksDto) => ({ ...homework, progress: { completed: 0, currentStep: 0, totalSteps: 10 } }));
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Search failed:', err);
                this.toast.actionFailed('common.search', 'homeworks.field', err.message);
            }
        });
    }

    onRouteDetail(type: string, id: string = '0'): void {
        this.router.navigate([`${this.basePath}/${type}/${id}`]);
    }

    onChangeClass(classId: string): void {
        console.log("🚀 ~ HomeworksListComponent ~ onChangeClass ~ classId:", classId);

    }

    toggleOutDate(value: any): void {
        console.log("🚀 ~ HomeworksListComponent ~ toggleOutDate ~ value:", value);
    }

}
