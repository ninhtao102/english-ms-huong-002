import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { SubmissionsDetailComponent } from './submissions-detail/submissions-detail.component';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';

const routes: Route[] = [
    {
        path: ':homeworkId',
        component: SubmissionsListComponent
    },
    {
        path: ':type/:id',
        component: SubmissionsDetailComponent
    },
];

@NgModule({
    declarations: [
        SubmissionsListComponent,
        SubmissionsDetailComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        // MatMomentDateModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatCheckboxModule,
        FuseAlertModule,
        MatCheckboxModule,
        SharedModule,
        TranslocoModule
    ],
})
export class SubmissionsModule { }
