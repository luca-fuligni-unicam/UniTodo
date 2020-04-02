const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, 'A todo must have a description'],
        trim: true,
        maxlength: [100, 'A todo description must have less or equal then 100 characters'],
        minlength: [5, 'A todo description must have more or equal then 5 characters']
    },
    completed:{
        type: Boolean,
        default: false,
    },
    priority:{
        type: Number,
        default: 1,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    duration: Number,
    tag: { 
        type: String,
        enum: {
            values: ['school', 'work', 'personal'],
            message: 'Tag is either: school, work, personal'
        },
        default: "personal"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
    userId : {
        type: String,
        required:true
    }
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;