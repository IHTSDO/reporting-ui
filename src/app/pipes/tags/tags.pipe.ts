import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tags',
    standalone: true
})
export class TagsPipe implements PipeTransform {

    transform(items: any[], managedServiceUser: boolean): any {
        if (!items) {
            return [];
        }

        if (managedServiceUser) {
            items = items.filter( item => item?.tags ? item?.tags.includes('MS') : false);
        } else {
            items = items.filter(item => item?.tags ? item?.tags.includes('INT') : false);
        }

        return items;
    }
}
