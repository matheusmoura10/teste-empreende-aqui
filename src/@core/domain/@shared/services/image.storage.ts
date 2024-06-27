import Image from "../entities/image";

export interface ImageStorage {
    upload(image: Image, local: string): Promise<string>;
}

export class ImageService {
    constructor(private storage: ImageStorage) { }

    async uploadImage(image: Image, local: string): Promise<string> {
        return await this.storage.upload(image, local);
    }
}