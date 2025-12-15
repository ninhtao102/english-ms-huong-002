import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { BaseDetailComponent } from './base-detail/base-detail.component';
import { BaseDialogComponent } from './base-dialog/base-dialog.component';
import { BaseListComponent } from './base-list/base-list.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DotPatternReplacePipe } from './pipe/dot-pattern-replace.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatCheckboxModule,
        TranslocoModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadcrumbComponent,
        BaseListComponent,
        BaseDialogComponent,
        ConfirmDialogComponent,
        DotPatternReplacePipe,
    ],
    declarations: [
        BreadcrumbComponent,
        BaseListComponent,
        BaseDialogComponent,
        BaseDetailComponent,
        ConfirmDialogComponent,
        DotPatternReplacePipe,
    ]
})
export class SharedModule {
}
