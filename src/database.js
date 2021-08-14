import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/globalhealth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('Database conectada'))
    .catch(error => console.log(error))
