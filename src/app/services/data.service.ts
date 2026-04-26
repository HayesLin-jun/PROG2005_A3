import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // SCU Provided API URL
  private readonly API_URL = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) {}

  // GET / (Get all)
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.API_URL);
  }

  // GET /{name} (Search single)
  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.API_URL}/${name}`);
  }

  // POST / (Add new)
  addItem(item: InventoryItem): Observable<any> {
    return this.http.post(this.API_URL, item);
  }

  // PUT /{name} (Update)
  updateItem(name: string, item: InventoryItem): Observable<any> {
    return this.http.put(`${this.API_URL}/${name}`, item);
  }

  // DELETE /{name} (Delete)
  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${name}`);
  }
}