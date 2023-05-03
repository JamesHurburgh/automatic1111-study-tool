import { ImageLoader } from "./ImageLoader"

class ImageWatcher {

    public static imageCount: number = 0
    public static imageNames: string[]

    static initialise() {
        if(this.imageCount > 0) return
        console.log('Initialising ImageWatcher')
        this.update()
    }

    static update() {
        console.log('Updating ImageWatcher')
        const imageGlobs = import.meta.glob('../../public/images/**/*.png')
        this.imageNames = Object.getOwnPropertyNames(imageGlobs)
        const diff = this.imageNames.length - this.imageCount
        this.imageCount = this.imageNames.length
        console.log(`ImageWatcher found ${this.imageCount}(${diff}) images`)
    }

}

export { ImageWatcher };