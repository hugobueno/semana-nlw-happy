import mongoosse from 'mongoose'

mongoosse.connect('mongodb://localhost:27017/happy', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((success)=>{
    console.log(`Successfully connected to MongoDb`)
})
.catch((error)=>{
    console.log(`Failed to connect with MongoDB ${error}`)
})

export default mongoosse