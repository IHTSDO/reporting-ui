import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'project'
})
export class ProjectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
