import { PngMetadataReader } from './PngMetadataReader'
import { Automate1111Metadata } from './Automate1111Metadata'
import { ImageDatabase } from './ImageDatabase';
import { LocalImage } from './LocalImage';

class ImageLoader {

    static async processImage(image: string): Promise<boolean> {
        var imageData = ImageDatabase.dao.readById(image)
        if (imageData) {
            return false
        } else {
            console.log(`Loading: ${image}`)
            var localImage = new LocalImage(image, null);
            const png = await PngMetadataReader.loadPng(image)
            const chunks = PngMetadataReader.toChunks(png)
            chunks
                .filter(chunk => chunk.type == "tEXt")
                .forEach(chunk => {
                    const metaData = Automate1111Metadata.fromPngMetadata(chunk.data)
                    localImage.metaData = metaData
                })
                ImageDatabase.dao.create(localImage)
            return true
        }
    }
}

export { ImageLoader };
