import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tags'
})
export class TagsPipe implements PipeTransform {

    transform(items: any[], managedService: boolean): any {
        if (!items) {
            return [];
        }

        if (managedService) {
            items = items.filter( item => item.tags ? item.tags.contains('MS') : true);
        } else {
            items = items.filter(item => item.tags ? item.tags.contains('INT') : true);
        }

        return items;
    }
}
