
import { Keyva } from 'keyvajs'
import { Artist } from './Artist';

class ArtistDatabase {

    private static _kv = new Keyva();
    private static _databaseName: string = 'ArtistDatabase'
    private static _database: Artist[];

    static async initialise() {
        if (this._database) return
        console.log("Initialising Artist Database.")
        this._database = JSON.parse(await this._kv.get(this._databaseName) || "[]") as Artist[]
    }

    public static getFilteredPage(params: { pageNumber: number; pageSize: number; }): Promise<Artist[]> {
        this.initialise()
        const startIndex = (params.pageNumber - 1) * params.pageSize;
        const endIndex = startIndex + params.pageSize;
        return this._database
            .slice(startIndex, endIndex)
    }

    static addArtist(artist: Artist): void {
        this.initialise()
        this._database.push(artist);
    }

    static removeArtist(artist: Artist): void {
        this.initialise()
        const index = this._database.indexOf(artist);
        if (index !== -1) {
            this._database.splice(index, 1);
        }
    }

    static getArtists(): Artist[] {
        this.initialise()
        return this._database;
    }

    static findArtistsByName(name: string): Artist[] {
        this.initialise()
        return this._database.filter(artist => artist.name === name);
    }
}

export { ArtistDatabase };
