import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '@app/core/user/user.service';
import { TranslocoService } from '@ngneat/transloco';
import { BaseListComponent } from '@shared/base-list/base-list.component';
import { ToastMessageService } from '@shared/base-service/toast-message.service';
import { ClassesDto } from '@shared/model/classes.model';
import { HomeworksDto, LIST_QUESTION_TYPES } from '@shared/model/homeworks.model';
import { PersonsDto } from '@shared/model/persons.model';
import { ClassesService } from '@shared/service/classes.service';
import { HomeworkService } from '@shared/service/homework.service';
import { PersonsService } from '@shared/service/persons.service';
import { RESPONSE_CODE_SUCCESS } from '@utils/constants/common';


@Component({
    selector: 'app-homeworks-list',
    templateUrl: './homeworks-list.component.html',
    styleUrls: ['./homeworks-list.component.scss']
})
export class HomeworksListComponent extends BaseListComponent implements OnInit {

    person: PersonsDto = null;
    homeworks: HomeworksDto[] = [];
    questionTypeOptions = LIST_QUESTION_TYPES;
    listClasses: ClassesDto[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private form: FormBuilder,
        private dialog: MatDialog,
        private _userService: UserService,
        private personsService: PersonsService,
        private homeworkService: HomeworkService,
        private classesService: ClassesService,
        private toast: ToastMessageService,
        private transloco: TranslocoService,
        private router: Router,
    ) {
        super();
        const currentUser = this._userService.currentUser;
        if (currentUser) {
            this.getPersonByUsername(currentUser.username);
        }
        this.filter = this.form.group({
            studentId: [''],
            classId: [''],
            title: [''],
            submitted: [false],
            onlyOutDate: [false],
            pageIndex: [0],
            pageSize: [30],
        });
        this.getClasses();
    }

    ngOnInit(): void {
        this.basePath = '/homeworks';
        this.tableSource = new MatTableDataSource([]);
    }

    getPersonByUsername(username): void {
        this.personsService.getByUsername(username).subscribe({
            next: (response: any) => {
                if (response.code === RESPONSE_CODE_SUCCESS) {
                    this.person = response.body;
                    this.filter.patchValue({ studentId: this.person.id });
                    this.searchHandler();
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Get person failed:', err);
                this.toast.actionFailed('common.get', 'persons.field', err.message);
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

    searchHandler(): void {
        const searchParams = this.filter.value;
        this.homeworkService.search(searchParams).subscribe({
            next: (response: any) => {
                if (response.body && Array.isArray(response.body)) {
                    this.homeworks = response.body;
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
