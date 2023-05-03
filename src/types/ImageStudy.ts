class ImageStudy {
  private _src: string;
  private _artist: string;
  private _subject: string;
  private _modifiers: string;
  private _prompt: string;

  constructor(src: string, artist: string, subject: string, modifiers: string, prompt: string) {
    this._src = src;
    this._artist = artist;
    this._subject = subject;
    this._modifiers = modifiers;
    this._prompt = prompt;
  }

  public static fromJson(jsonData: any): ImageStudy {
    const imageStudy = new ImageStudy(
      jsonData.src,
      jsonData.artist,
      jsonData.subject,
      jsonData.modifiers,
      jsonData.prompt
    );
  
    return imageStudy;
  }

  get src(): string {
    return this._src;
  }

  set src(value: string) {
    this._src = value;
  }

  get artist(): string {
    return this._artist;
  }

  set artist(value: string) {
    this._artist = value;
  }

  get subject(): string {
    return this._subject;
  }

  set subject(value: string) {
    this._subject = value;
  }

  get modifiers(): string {
    return this._modifiers;
  }

  set modifiers(value: string) {
    this._modifiers = value;
  }

  get prompt(): string {
    return this._prompt;
  }

  set prompt(value: string) {
    this._prompt = value;
  }
}

export { ImageStudy };