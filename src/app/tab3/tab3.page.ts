import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { InventoryItem } from '../models/inventory.model';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {
  searchName: string = '';
  item: InventoryItem | null = null;
  isSearching: boolean = false;

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  // Advanced search with loading indicator
  async fetchItem() {
    const query = this.searchName.trim();
    if (!query) {
      this.item = null;
      return;
    }

    this.isSearching = true;
    this.dataService.getItemByName(query).subscribe({
      next: (res) => {
        this.item = res;
        this.isSearching = false;
      },
      error: () => {
        this.item = null;
        this.isSearching = false;
      }
    });
  }

  async updateItem() {
    if (!this.item) return;
    
    const loading = await this.loadingCtrl.create({ message: 'Updating...' });
    await loading.present();

    this.dataService.updateItem(this.item.item_name, this.item).subscribe({
      next: () => {
        loading.dismiss();
        this.presentToast('Inventory record synchronized!', 'success');
      },
      error: () => {
        loading.dismiss();
        this.presentToast('Update failed. Try again.', 'danger');
      }
    });
  }

  // Double confirmation for deletion
  async confirmDelete() {
    if (!this.item) return;

    // SCU Security Rule: Protect Laptop
    if (this.item.item_name.toLowerCase() === 'laptop') {
      const alert = await this.alertCtrl.create({
        header: 'System Protected',
        subHeader: 'Action Denied',
        message: 'The "Laptop" record is a critical asset and cannot be removed from the system.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to permanently delete <strong>${this.item.item_name}</strong>?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => { this.executeDelete(); }
        }
      ]
    });
    await alert.present();
  }

  private executeDelete() {
    if (!this.item) return;
    this.dataService.deleteItem(this.item.item_name).subscribe(() => {
      this.presentToast('Item removed from database.', 'medium');
      this.item = null;
      this.searchName = '';
    });
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000, color: color, position: 'top' });
    toast.present();
  }
}