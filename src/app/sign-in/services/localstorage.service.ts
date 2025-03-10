import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalstorageService<T> {
  set(key: string, object: T) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  get(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);

    return null;
  }
}
