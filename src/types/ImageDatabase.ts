import { LocalImage } from './LocalImage'
import { Dao } from './Dao'
import { Keyva } from 'keyvajs'
import { reactive } from 'vue'
import { ImageDatabaseStats } from './ImageDatabaseStats'

class ImageDatabase {

    private static _kv = new Keyva();
    private static _databaseName: string = 'ImageDatabase'
    private static _database: LocalImage[]
    private static _dao: Dao<LocalImage>;

    public static get dao(): Dao<LocalImage> {
        if (!this._dao) throw ('ImageDatabase not initialised')
        return ImageDatabase._dao;
    }

    public static getFilteredPage(params: { pageNumber: number; pageSize: number; artistFitler: string[]; }): LocalImage[] {
        const startIndex = (params.pageNumber - 1) * params.pageSize;
        const endIndex = startIndex + params.pageSize;
        return this._database
            .filter(li => params.artistFitler?.length == 0 || params.artistFitler.some(artistFilter => li.metaData?.prompt.toLowerCase().includes(artistFilter.toLowerCase())))
            .slice(startIndex, endIndex)
    }

    static async initialise() {
        if (this._dao) return
        console.log("Initialising Image Database.")
        this._database = JSON.parse(await this._kv.get(this._databaseName) || "[]") as LocalImage[]
        this._dao = new Dao<LocalImage>(this._database)
        this.updateTotal()
    }

    static commit() {
        this._kv.set(this._databaseName, JSON.stringify(this._database))
        this.updateTotal()
    }

    static updateTotal() {
        console.log("Updating total")
        ImageDatabaseStats.totalImages = this._dao.total()
    }
}

export { ImageDatabase };