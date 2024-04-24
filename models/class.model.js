import mongoose, { Schema, Document } from 'mongoose';



const ClassSchema = new Schema({
    class: { type: Number},
    school:{type:String,default:'BSS'},
    teacher: [{ type: Schema.Types.ObjectId,  }],
    students: [{ type: Schema.Types.ObjectId }],
});

const ClassModel = mongoose.model('class', ClassSchema);

export const createClass = (obj) => ClassModel.create(obj);
export const findClass = (query) => ClassModel.findOne(query);
export const findAllClasses = () => ClassModel.find();