import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { InventoryItem } from '../models/inventory.model';
import { ToastController } from '@ionic/angular';

@Component({ selector: 'app-tab2', templateUrl: 'tab2.page.html',standalone: false })
export class Tab2Page implements OnInit {
  viewMode: string = 'add'; // Controls the segment toggle
  featuredItems: InventoryItem[] = [];
  
  newItem: InventoryItem = {
    item_name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: 'In Stock',
    featured_item: 0
  };

  constructor(private dataService: DataService, private toast: ToastController) {}

  ngOnInit() { this.loadFeatured(); }

  loadFeatured() {
    this.dataService.getAllItems().subscribe(data => {
      this.featuredItems = data.filter(i => i.featured_item > 0);
    });
  }

  async onAdd() {
    this.dataService.addItem(this.newItem).subscribe(async () => {
      const t = await this.toast.create({ message: 'Item Added!', duration: 2000, color: 'success' });
      t.present();
      this.loadFeatured(); // Refresh featured list
    });
  }
}