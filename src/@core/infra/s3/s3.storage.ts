import Image from "@core/domain/@shared/entities/image";
import { ImageStorage } from "@core/domain/@shared/services/image.storage";
import { S3 } from "aws-sdk";
import { createHash } from "crypto";

export class S3ImageStorage implements ImageStorage {
    private s3: S3;

    constructor() {
        this.s3 = new S3({
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            region: process.env.S3_REGION
        });
    }

    async upload(image: Image, local: string): Promise<string> {
        try {
            const params = {
                Bucket: local,
                Key: this.hashFilename(image.originalname),
                Body: image.buffer,
                ContentType: image.mimeType
            };

            const data = await this.s3.upload(params).promise();
            return data.Location;
        } catch (err) {
            throw new Error("Error uploading image");
        }
    }

    private hashFilename(filename: string): string {
        return createHash('sha256').update(filename).digest('hex');
    }
}