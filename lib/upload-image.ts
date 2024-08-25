import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UploadPDF = async (file: File, folder: string) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'raw',
            },
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );

        const fileReader = file.stream().getReader();
        const streamReadable = new ReadableStream({
            async pull(controller) {
                const { done, value } = await fileReader.read();
                if (done) {
                    controller.close();
                } else {
                    controller.enqueue(value);
                }
            },
            cancel() {
                fileReader.releaseLock();
            }
        });

        streamReadable.pipeTo(new WritableStream({
            write(chunk) {
                stream.write(chunk);
            },
            close() {
                stream.end();
            },
            abort(err) {
                stream.destroy(err);
            }
        }));
    });
};
