import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'type'
})
export class TypePipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if(!items) return [];
        if(!searchText) return items;

        // searchText = searchText.toLowerCase();
        items = items.filter(item => item.type === searchText);
        return items;
    }

}
