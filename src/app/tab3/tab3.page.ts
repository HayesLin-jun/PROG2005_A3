import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryService } from '../services/inventory';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false
})
export class Tab3Page {
  searchForm: FormGroup;
  itemForm: FormGroup;
  itemFound = false;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private toastController: ToastController
  ) {
    this.searchForm = this.fb.group({ name: [''] });
    this.itemForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      category: [''],
      quantity: [1],
      price: [1],
      supplier: [''],
      status: ['In Stock']
    });
  }

  searchItem() {
    const name = this.searchForm.value.name;
    this.inventoryService.getItemByItemName(name).subscribe({
      next: (item) => {
        this.itemForm.patchValue(item);
        this.itemFound = true;
      },
      error: async () => {
        const t = await this.toastController.create({
          message: 'Item not found',
          duration: 2000,
          color: 'danger'
        });
        t.present();
      }
    });
  }

  async updateItem() {
    const name = this.searchForm.value.name;
    if (name.toLowerCase() === 'laptop') {
      const t = await this.toastController.create({
        message: 'Laptop cannot be updated',
        duration: 2000,
        color: 'warning'
      });
      t.present();
      return;
    }

    this.inventoryService.updateInventoryItem(name, this.itemForm.value).subscribe({
      next: async () => {
        const t = await this.toastController.create({
          message: 'Item updated',
          duration: 2000,
          color: 'success'
        });
        t.present();
      },
      error: async () => {
        const t = await this.toastController.create({
          message: 'Update failed',
          duration: 2000,
          color: 'danger'
        });
        t.present();
      }
    });
  }

  async deleteItem() {
    const name = this.searchForm.value.name;
    if (name.toLowerCase() === 'laptop') {
      const t = await this.toastController.create({
        message: 'Laptop cannot be deleted',
        duration: 2000,
        color: 'warning'
      });
      t.present();
      return;
    }

    this.inventoryService.deleteInventoryItem(name).subscribe({
      next: async () => {
        const t = await this.toastController.create({
          message: 'Item deleted',
          duration: 2000,
          color: 'success'
        });
        t.present();
        this.itemFound = false;
        this.searchForm.reset();
        this.itemForm.reset();
      },
      error: async () => {
        const t = await this.toastController.create({
          message: 'Delete failed',
          duration: 2000,
          color: 'danger'
        });
        t.present();
      }
    });
  }
}