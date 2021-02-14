import { Injectable } from '@angular/core';

export enum LocalStorageKeys {
  CART_KEY = 'cart',
  TOKEN_KEY = 'token',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  save(key: string, entityToSave: any): void {
    if (typeof entityToSave === 'string')
      localStorage.setItem(key, entityToSave);
    else localStorage.setItem(key, JSON.stringify(entityToSave));
  }

  load(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  removeAll(): void {
    localStorage.clear();
  }
}
