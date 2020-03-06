import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'projectMatcher'
})
export class ProjectMatcherPipe implements PipeTransform {

    transform(items: any[], projects, activeProject): any {
        if (!items) {
            return [];
        }

        items = items.filter( item => {
            return projects.find(project => {
                if (item.parameters.Project) {
                    return item.parameters.Project.value === project.key;
                }
            });
        });

        return items;
    }
}
