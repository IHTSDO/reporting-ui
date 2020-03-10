import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mainToTop'
})
export class MainToTopPipe implements PipeTransform {

    transform(items: any[], key): any {
        if (!items) {
            return [];
        }

        const main = items.find(item => item[key] === 'MAIN');

        if (main) {
            items = items.filter(item => item[key] !== 'MAIN');

            items.unshift(main);
        }

        return items;
    }
}
