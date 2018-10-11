import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if(!items) return [];
        if(!searchText) return items;

        // searchText = searchText.toLowerCase();
        items = items.filter(item => item.name.includes(searchText));
        return items;
    }
}
