import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from '../models/item.interface';

const BASE_API_URL = 'https://prog2005.it.scu.edu.au/ArtGalley';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private httpClient: HttpClient) {}

  // Get all inventory items
  getAllInventoryItems() {
    return this.httpClient.get<InventoryItem[]>(BASE_API_URL);
  }

  // Search item by name
  getItemByItemName(itemName: string) {
    return this.httpClient.get<InventoryItem>(`${BASE_API_URL}/${itemName}`);
  }

  // Add new item
  addNewInventoryItem(newItem: InventoryItem) {
    return this.httpClient.post(BASE_API_URL, newItem);
  }

  // Update item
  updateInventoryItem(itemName: string, updatedItem: InventoryItem) {
    return this.httpClient.put(`${BASE_API_URL}/${itemName}`, updatedItem);
  }

  // Delete item (Laptop cannot be deleted)
  deleteInventoryItem(itemName: string) {
    return this.httpClient.delete(`${BASE_API_URL}/${itemName}`);
  }
}