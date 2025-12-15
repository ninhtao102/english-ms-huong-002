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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { HomeworksDetailComponent } from './homeworks-detail/homeworks-detail.component';
import { HomeworksListComponent } from './homeworks-list/homeworks-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';

const routes: Route[] = [
    {
        path: '',
        component: HomeworksListComponent
    },
    {
        path: ':id',
        component: HomeworksDetailComponent
    },
];

@NgModule({
    declarations: [
        HomeworksListComponent,
        HomeworksDetailComponent,
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
        MatSlideToggleModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTabsModule,
        SharedModule,
        TranslocoModule
    ],
})
export class HomeworksModule { }
