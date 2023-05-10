import { LocalImage } from './LocalImage'
import { Dao } from './Dao'
import { Keyva } from 'keyvajs'
import { DatabaseStats } from './DatabaseStats'

class ImageDatabase {

    private static _kv = new Keyva();
    private static _databaseName: string = 'ImageDatabase'
    private static _database: LocalImage[]
    private static _dao: Dao<LocalImage>;

    public static get dao(): Dao<LocalImage> {
        if (!this._dao) throw ('ImageDatabase not initialised')
        return ImageDatabase._dao;
    }

    static getAll(): LocalImage[] {
        this.initialise()
        return this._database;
    }

    public static getFilteredPage(params: { pageNumber: number; pageSize: number; artistFilter: string[]; }): LocalImage[] {
        const startIndex = (params.pageNumber - 1) * params.pageSize;
        const endIndex = startIndex + params.pageSize;
        return this._database
            .filter(li => params.artistFilter?.length == 0 || params.artistFilter.some(artistFilter => li.metaData?.prompt.toLowerCase().includes(artistFilter.toLowerCase())))
            .slice(startIndex, endIndex)
    }

    public static getById(imageId: string) {
        return this._database
            .filter(image => image.id == imageId)[0]
    }

    static async initialise() {
        if (this._dao) return
        console.log("Initialising Image Database.")
        this._database = JSON.parse(await this._kv.get(this._databaseName) || "[]") as LocalImage[]
        this._dao = new Dao<LocalImage>(this._database)
        this.updateStats()
    }

    static commit() {
        this._kv.set(this._databaseName, JSON.stringify(this._database))
        this.updateStats()
    }

    static updateStats() {
        DatabaseStats.totalImages = this._database.length
    }
}

export { ImageDatabase };