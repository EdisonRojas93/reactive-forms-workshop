import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface NewRoomConfig {
  id?: number;
  roomName: string;
  numberOfRows: number;
  avgSeatsInRow: number;
}

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  newRoomConfigs: Dexie.Table<NewRoomConfig, number>;

  constructor() {
    super('RoomsDemo');

    this.version(1).stores({
      newRoomConfigs: '++id, name'
    });

  }

  saveRoomConfig(config) {
    if (!config.id) { // id === null, need to remove so dexie will generate id
      delete config.id;
    } // else - updating an existing config
    return this.newRoomConfigs.put(config);
  }
}
