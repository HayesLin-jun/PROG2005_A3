import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory';
import { InventoryItem } from '../models/item.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  fullItemList: InventoryItem[] = [];
  filteredItemList: InventoryItem[] = [];
  searchKeyword: string = '';

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadAllInventoryData();
  }

  // Load all items from university API
  loadAllInventoryData() {
    this.inventoryService.getAllInventoryItems().subscribe(res => {
      this.fullItemList = res;
      this.filteredItemList = res;
    });
  }

  // Filter items by name search
  searchItemsByName() {
    if (!this.searchKeyword) {
      this.filteredItemList = this.fullItemList;
      return;
    }
    this.filteredItemList = this.fullItemList.filter(item => 
      item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}