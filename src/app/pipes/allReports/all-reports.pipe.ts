import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../models/user';

@Pipe({
    name: 'allReports'
})
export class AllReportsPipe implements PipeTransform {

    transform(items: any[], allReports: boolean, user: User): any {
        if (!items) {
            return [];
        }

        if (allReports) {
            return items;
        } else {
            return items.filter( item => item.user === user.login);
        }
    }
}
