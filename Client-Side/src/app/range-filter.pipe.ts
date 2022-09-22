import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeFilter'
})
export class RangeFilterPipe implements PipeTransform {

  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
        return items;
    }
    return items.filter(item => callback(item));
}

}
