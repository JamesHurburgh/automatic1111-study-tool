import { DataItem } from './DataItem';

class Dao<T extends DataItem> {

    private data: DataItem[];

    constructor(data: T[]) {
        this.data = data;
    }

    public total(): number {
        return this.data.length;
    }

    public readById(id: string) {
      return this.data.filter(item => item.id == id)[0] || null
    }

    public create(data: T) {
      const existingItem = this.readById(data.id);
      if (existingItem) {
        throw new Error(`An item with the id ${data.id} already exists`);
      }
      this.data.push(data);
    }
  
    public update(data: T) {
      const index = this.data.findIndex((item) => item.id === data.id);
      if (index === -1) {
        throw new Error(`No item with the id ${data.id} found`);
      }
      this.data[index] = data;
    }

    public getPage<T>(pageNum: number, pageSize: number): T[] {
        const startIndex = (pageNum - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return this.data.slice(startIndex, endIndex) as Array<T>;
    }

    public getTotalPages(pageSize: number): number {
      return Math.ceil(this.data.length / pageSize);
    }
  }
  

export { Dao };