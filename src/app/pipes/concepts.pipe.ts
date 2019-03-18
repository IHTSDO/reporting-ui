import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'concepts'
})
export class ConceptsPipe implements PipeTransform {

    transform(items: any, args?: any): any {
        if (!items) {
            return [];
        }
        if (!('items' in items)) {
            return [];
        }

        const values = [];

        items.items.forEach((item) => {
            values.push(item);
        });

        return values;
    }
}
