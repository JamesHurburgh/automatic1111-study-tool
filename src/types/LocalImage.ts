import { Automate1111Metadata } from './Automate1111Metadata';
import { DataItem } from './DataItem';

class LocalImage extends DataItem {

    public metaData: Automate1111Metadata | null;

    constructor(id: string, metaData: Automate1111Metadata | null) {
        super(id);
        this.metaData = metaData;
    }
}

export { LocalImage };
