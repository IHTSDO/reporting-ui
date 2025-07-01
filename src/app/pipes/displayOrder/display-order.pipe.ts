import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'displayOrder',
    standalone: true
})
export class DisplayOrderPipe implements PipeTransform {

    transform(items: any, args?: any): any {
        if (!items) {
            return [];
        }

        items.sort(function (a, b) {
            return a.value.displayOrder - b.value.displayOrder;
        });

        return items;
    }
}
