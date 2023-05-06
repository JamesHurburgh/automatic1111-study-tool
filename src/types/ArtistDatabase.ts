
import { Keyva } from 'keyvajs'
import { Artist } from './Artist';
import { DatabaseStats } from './DatabaseStats';

class ArtistDatabase {

    private static _kv = new Keyva();
    private static _databaseName: string = 'ArtistDatabase'
    private static _database: Artist[];

    static async initialise() {
        if (this._database) return
        console.log("Initialising Artist Database.")
        this._database = JSON.parse(await this._kv.get(this._databaseName) || "[]") as Artist[]
        this.updateStats()
    }

    static commit() {
        this._kv.set(this._databaseName, JSON.stringify(this._database))
        this.updateStats()
    }

    public static getFilteredPage(params: { pageNumber: number; pageSize: number; }): Artist[] {
        this.initialise()
        const startIndex = (params.pageNumber - 1) * params.pageSize;
        const endIndex = startIndex + params.pageSize;
        return this._database
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(startIndex, endIndex)
    }

    static addArtist(artist: Artist): void {
        this.initialise()
        this._database.push(artist)
        this.commit()
    }

    static removeArtist(artist: Artist): void {
        this.initialise()
        const index = this._database.indexOf(artist);
        if (index !== -1) {
            this._database.splice(index, 1)
            this.commit()
        }
    }

    static getArtists(): Artist[] {
        this.initialise()
        return this._database;
    }

    static findArtistsByName(name: string): Artist[] {
        this.initialise()
        return this._database.filter(artist => artist.name.toLowerCase() === name.toLowerCase());
    }

    static updateStats() {
        DatabaseStats.totalArtists = this._database.length
    }
}

export { ArtistDatabase };
