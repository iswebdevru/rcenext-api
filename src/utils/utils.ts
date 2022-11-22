import { Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
  distributeItems<T>(prev: T[], current: T[]) {
    const removed = prev.filter(i => !current.includes(i));
    const added = current.filter(i => !prev.includes(i));
    return [removed, added];
  }
}
