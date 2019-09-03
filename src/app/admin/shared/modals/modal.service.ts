import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private myData = new BehaviorSubject<any>('hello');
  categoriesForm = this.myData.asObservable();

  constructor() {
  }

  hello(data: any) {
    this.myData.next(data);
  }





}
