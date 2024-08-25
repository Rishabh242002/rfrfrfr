// import mongoose from 'mongoose';

// export const ConnectDB = async () => {
//     try {
//         if (mongoose.connection.readyState >= 1) {
//             return;
//         }
//         await mongoose.connect("mongodb://localhost/image-gallary-nextjs");
//         console.log(`Database connected: ${mongoose.connection.host}`);
//     } catch (error) {
//         console.error(`Database connection error: ${error}`);
//         mongoose.disconnect();
//         process.exit(1);
//     }
// }
