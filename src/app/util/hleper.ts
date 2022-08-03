import { BehaviorSubject } from 'rxjs';

export class Helper {

  static copy(source: { [x: string]: any }, target: { [x: string]: any }) {
    for (var key in source) {
      if (typeof source[key] === 'object') {
        Helper.copy(source[key], target[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  static copyInvert(
    source: { [x: string]: any },
    target: { [x: string]: any }
  ) {
    for (var key in target) {
      if (typeof target[key] === 'object') {
        Helper.copy(source[key], target[key]);
      } else {
        source[key] = target[key];
      }
    }
  }

}