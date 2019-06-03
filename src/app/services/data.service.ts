import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getFaculties(): string[] {
    return [
      'FABL',
      'Science',
      'Engineering'
    ];
  }

  getTimestamp(d: Date): number {
    return d.getTime();
  }
}
