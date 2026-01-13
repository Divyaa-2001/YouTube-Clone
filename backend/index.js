import express from 'express'
import mongoose from 'mongoose';
import userRoutes from "./routes/user.routes.js";

const app = express()
app.use(express.json());
app.use("/", userRoutes);

mongoose.connect('mongodb+srv://erdivyacs_db_user:KuykhpEHQYL2dpd7@cluster0.nqylduh.mongodb.net/YouTube-Clone')
    .then(() => {
     console.log("DB CONNECTED")
    })
    .catch(() => {
    console.log("DB NOT CONNECTED")
    })

const PORT = 8000;

app.listen(PORT, () => {
     console.log(`server connected at ${PORT}`)
})


// erdivyacs_db_user
// KuykhpEHQYL2dpd7