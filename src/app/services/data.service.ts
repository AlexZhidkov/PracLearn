import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getFaculties(): string[] {
    return [
      'Business, Operations/Consulting',
      'Marketing',
      'Accounting',
      'Human Resources'
    ];
  }

  getTimestamp(d: Date): number {
    return d.getTime();
  }
}
