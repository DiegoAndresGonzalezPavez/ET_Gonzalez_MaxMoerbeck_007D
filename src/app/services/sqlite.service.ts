import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection; 
  private dbReady = new BehaviorSubject<boolean>(false);
  private isWeb: boolean;
  private isIos: boolean = false;
  private dbName = 'myappdb';

  constructor(private http: HttpClient) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.isWeb = Capacitor.getPlatform() === 'web';
    this.init();
  }

  async init() {
    const info = await Device.getInfo();
    this.isIos = info.platform === 'ios';
    this.setupDatabase();
  }

  private async setupDatabase() {
    if (this.isWeb) {
      await customElements.whenDefined('jeep-sqlite');
      const jeepSqlite = document.querySelector('jeep-sqlite');
      if (jeepSqlite != null) {
        await this.sqlite.initWebStore();
      }
    }

    const dbSetup = await this.sqlite.checkConnectionsConsistency();
    const isConn = await this.sqlite.isConnection(this.dbName, false); 

    if (dbSetup.result && !isConn.result) {
      await this.downloadDatabase();
    } else if (!dbSetup.result) {
      await this.sqlite.closeConnection(this.dbName, false); 
      await this.downloadDatabase();
    }

    this.dbReady.next(true);
  }

  private async downloadDatabase() {
    this.http.get('assets/db.json').subscribe(async (jsonExport: any) => {
      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await this.sqlite.isJsonValid(jsonstring);
      
      if (isValid.result) {
        await this.sqlite.importFromJson(jsonstring);
        this.db = await this.sqlite.createConnection(
          this.dbName,
          false,
          'no-encryption',
          1,
          false
        );
        await this.db.open();
      }
    });
  }

  async addData(table: string, data: any) {
    const query = `INSERT INTO ${table} (name, email) VALUES (?, ?)`;
    return await this.db.run(query, [data.name, data.email]);
  }

  async getData(table: string) {
    const query = `SELECT * FROM ${table}`;
    const result = await this.db.query(query);
    return result.values;
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
}