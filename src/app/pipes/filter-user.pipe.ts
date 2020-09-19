import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser',
})
export class FilterUserPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '') {
      return value;
    }
    const resultPosts = [];
    for (const post of value) {
      if (
        post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.userName.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }
}
