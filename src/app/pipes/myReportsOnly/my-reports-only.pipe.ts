import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../models/user';

@Pipe({
    name: 'myReportsOnly'
})
export class MyReportsOnlyPipe implements PipeTransform {

    transform(items: any[], myReportsOnly: boolean, user: User): any {
        if (!items) {
            return [];
        }

        if (myReportsOnly) {
            return items.filter( item => item.user === user.login);
        } else {
            return items;
        }
    }
}
