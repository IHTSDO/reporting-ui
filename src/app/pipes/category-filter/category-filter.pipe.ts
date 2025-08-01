import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'categoryFilter',
    standalone: true
})
export class CategoryFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string, categoryName: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        items = items.filter(item => {
            return item.name.toLowerCase().includes(searchText);
        });

        return items;
    }
}
