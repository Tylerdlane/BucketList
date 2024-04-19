const mongoose = require('mongoose')

const bucketListSchema = {
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [4, "Should be at least 4 characters long"],
        maxLength: [30, "Should be less than 30 characters"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}

const BucketModel = mongoose.model('bucketListitem', bucketListSchema)

module.exports = BucketModel