import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PersonsDto } from '../../../shared/model/persons.model';
import { UserService } from '@app/core/user/user.service';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {

    userInfo: PersonsDto = null;

    constructor(
        private userService: UserService,
    ) {
        this.userInfo = this.userService.currentUser;
    }

    ngOnInit(): void {
    }

}
