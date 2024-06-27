export default class Image {
    constructor(
        public readonly originalname: string,
        public readonly buffer: Buffer,
        public readonly mimeType: string
    ) { }
}