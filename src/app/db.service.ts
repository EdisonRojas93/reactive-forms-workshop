import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface SeatType {
  id?: number;
  name?: string;
  color?: string;
  price?: number;
}

export interface NewRoomConfig {
  id?: number;
  roomName: string;
  numberOfRows: number;
  avgSeatsInRow: number;
}

export interface Seat {
  type?: number;
}

export interface Row {
  numberOfSeats: number;
  seats?: Array<Seat>;
}

export interface SeatingConfig {
  id: number;
  roomName: string;
  seating: Array<Row>;
}

function generateSeating(numberOfRows, avgSeatsInRow) {
  return Array.from({ length: numberOfRows }, (_, row) => {
    return {
      numberOfSeats: avgSeatsInRow,
      seats: Array.from({ length: avgSeatsInRow }, (_, seatInRow) => {
        return {
        };
      })
    };
  });
}

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  newRoomConfigs: Dexie.Table<NewRoomConfig, number>;
  seatingConfigs: Dexie.Table<SeatingConfig, number>;

  constructor() {
    super('RoomsDemo');

    this.version(1).stores({
      newRoomConfigs: '++id, name'
    });

    this.version(2).stores({
      seatingConfigs: 'id, name'
    });

  }

  saveRoomConfig(config) {
    if (!config.id) { // id === null, need to remove so dexie will generate id
      delete config.id;
    } // else - updating an existing config
    return this.newRoomConfigs.put(config);
  }

  getRoomConfig(index) {
    return from(index ? this.newRoomConfigs.get(+index) : Promise.resolve(null));
  }

  getSeatingConfig(index): Observable<SeatingConfig> {
    return from(this.seatingConfigs.get(index))
      .pipe(switchMap(config => {
        if (config) {
          return of(config);
        } else {
          return this.getRoomConfig(index).pipe(map(roomConfig => {
            if (!roomConfig) {
              return null;
            }
            return {
              id: roomConfig.id,
              roomName: roomConfig.roomName,
              seating: generateSeating(roomConfig.numberOfRows, roomConfig.avgSeatsInRow)
            };
          }));
        }
      }));
  }

  saveSeatingConfig(config) {
    return this.seatingConfigs.put(config);
  }
}

