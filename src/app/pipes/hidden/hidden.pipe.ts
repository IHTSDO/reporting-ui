import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hidden',
    standalone: true
})
export class HiddenPipe implements PipeTransform {

    transform(items: any[], args?: any): any {
        if (!items) {
            return [];
        }

        items = items.filter(item => item.value.type !== 'HIDDEN');

        return items;
    }
}
