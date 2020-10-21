import mongoose from '../database/connection'

const OrphanegesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    about: {
        type: String,
        required: true,
        maxlength: 300
    },
    instructions: {
        type: String,
        required: true,
    },
    open_hours: {
        type: String,
    },
    open_on_weekends: {
        type: Boolean,
        required: true,
        default: false
    },
    images: [
        {
            path: {
                type: String,
                required: true
            },
            
        }
    ],

    createAt: {
        type: Date,
        default: Date.now
    }

})

const OrPhanetes = mongoose.model('OrPhanetes', OrphanegesSchema)

export default OrPhanetes