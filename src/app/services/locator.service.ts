import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocatorService {

  public static injector: Injector;
  constructor() { }
}
