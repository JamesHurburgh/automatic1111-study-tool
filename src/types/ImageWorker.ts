import { ImageDatabase } from "./ImageDatabase"
import { ImageLoader } from "./ImageLoader"
import { ImageWatcher } from "./ImageWatcher"

self.onmessage = async (e: MessageEvent<string>) => {
  console.log("ImageWorker initialised.")
  const startTime = performance.now();

  var imagesLoaded = 0
  await ImageDatabase.initialise()
  ImageWatcher.initialise()
  var imagesToScan = ImageWatcher.imageNames
  var imagesToScanCount = imagesToScan.length
  const batchSize = 13
  while (imagesToScan.length > 0) {
    const batch = imagesToScan.slice(0, batchSize);
    if (batch.length === 0) {
      continue;
    }
    imagesToScan = imagesToScan.slice(batchSize);
    const results = await Promise.all(batch.map(image => ImageLoader.processImage(image)))
    const updated = results.filter(result => result === true).length;
    if(updated > 0){
      console.log(`Commiting ${updated} updates.`)
      ImageDatabase.commit()
      const newTotal = ImageDatabase.dao.total()
      postMessage(newTotal)
      imagesLoaded += updated
    }
  }
  
  const endTime = performance.now();
  const seconds = Math.round(endTime - startTime) / 1000

  console.log(`ImageWorker scanned ${imagesToScanCount} images and loaded ${imagesLoaded} in ${seconds} seconds.`)
}