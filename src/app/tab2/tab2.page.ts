import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../services/inventory';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false
})
export class Tab2Page {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private toastController: ToastController
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Electronics', Validators.required],
      quantity: [1, Validators.required],
      price: [1, Validators.required],
      supplier: ['', Validators.required],
      status: ['In Stock', Validators.required],
      featured: [0],
      notes: ['']
    });
  }

  async addItem() {
    if (this.itemForm.invalid) {
      const toast = await this.toastController.create({
        message: 'Please fill all required fields',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    this.inventoryService.addNewInventoryItem(this.itemForm.value).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Item added successfully',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.itemForm.reset();
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Failed to add item',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}