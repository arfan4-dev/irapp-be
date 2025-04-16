import connectDB from './src/config/db.config.js';
import { PORT } from './src/config/env.config.js';
import { app } from './app.js';

connectDB()
    .then(() => {
        app.listen(PORT, () => {
             
            console.log(`⚙️ Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
         
        console.log('MongoDB connection failed!', err);
    });
