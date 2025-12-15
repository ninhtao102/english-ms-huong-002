import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@utils/constants/common';

@Component({
    selector: 'app-base-list',
    templateUrl: './base-list.component.html',
    styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent implements OnInit {

    basePath: string = '';
    filter: FormGroup;
    tableSource: MatTableDataSource<any>;
    pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
    totalElements: number = 0;

    constructor() { }

    ngOnInit(): void {
        this.tableSource = new MatTableDataSource([]);
    }

    getValueFiter(controlName: string): any {
        return this.filter.get(controlName)?.value;
    }

}
