import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service';
import { defineCustomElements } from 'jeep-sqlite/loader'; 
import { register } from 'swiper/element/bundle';


register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private sqliteService: SqliteService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    
    if (Capacitor.getPlatform() === 'web') {
      defineCustomElements(window);
    }
  }
}