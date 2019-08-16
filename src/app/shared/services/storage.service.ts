import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // get value by key
  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  // set value by key
  set(key: string, payload: string): void {
    localStorage.setItem(key, payload);
  }

  // delete value by key
  delete(key: string): void {
    localStorage.removeItem(key);
  }

  // clear storage
  flush(): void {
    localStorage.clear();
  }
}
