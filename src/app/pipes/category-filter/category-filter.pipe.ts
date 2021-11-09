import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string, categoryName: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        console.log('IN: ', items);

        searchText = searchText.toLowerCase();

        items = items.filter(item => {
            return item.name.toLowerCase().includes(searchText);
        });

        console.log('OUT: ', items);
        return items;
    }
}
