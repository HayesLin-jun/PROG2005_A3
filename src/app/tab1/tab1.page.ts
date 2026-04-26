import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { InventoryItem } from '../models/inventory.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  searchQuery: string = '';
  itemCount: number = 0;

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.dataService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
        this.itemCount = data.length;
      },
      error: (err) => console.error('API Error:', err)
    });
  }

  // 状态颜色逻辑
  getStatusColor(status: string): string {
    const s = status?.toLowerCase().trim();
    switch (s) {
      case 'in stock':
        return 'success';  // 绿色
      case 'low stock':
        return 'warning';  // 橙色
      case 'out of stock':
        return 'danger';   // 红色
      default:
        return 'medium';   // 灰色
    }
  }

  handleSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    if (query === '') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item => 
        item.item_name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    this.itemCount = this.filteredItems.length;
  }

  async showHelp() {
    const alert = await this.alertCtrl.create({
      header: 'Inventory Help',
      message: 'Green = In Stock, Orange = Low Stock, Red = Out of Stock.',
      buttons: ['OK']
    });
    await alert.present();
  }
}