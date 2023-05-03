import events from 'events'
import fs from 'fs'

const watchDir = './watch';
const processedDir = './done';

class Watcher extends events.EventEmitter {
  watchDir: string;
  processedDir: string;

  constructor(watchDir: string, processedDir: string) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }

  watch() {
    const watcher = this;
    fs.readdir(this.watchDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        watcher.emit('process', file);
      });
    });
  }

  start() {
    const watcher = this;
    fs.watchFile(watchDir, () => {
      watcher.watch();
    });
  }
}

const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', (file: string) => {
  const watchFile = `${watcher.watchDir}/${file}`;
  const processedFile = `${watcher.processedDir}/${file.toLowerCase()}`;
  fs.rename(watchFile, processedFile, (err) => {
    if (err) throw err;
  });
});

watcher.start();
