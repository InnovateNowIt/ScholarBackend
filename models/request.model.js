import mongoose from 'mongoose'

const sessionRequestSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    meetUrl:{
        type: String
    }

},{timestamps: true, versionKey: false});

const SessionRequest = mongoose.model('SessionRequest', sessionRequestSchema);

export const createSessionRequest = (obj) => SessionRequest.create(obj);
export const fetchSessionRequest = (query) => SessionRequest.find(query);
export const fetchOneSessionRequest = (query) => SessionRequest.findOne(query);