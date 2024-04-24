import mongoose from 'mongoose';

const meetSessionSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class',
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelated:{
        type:Boolean,
        default:false
    },
    oneOnOne:{
        type:Boolean,
        default:false
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
});
// https://www.googleapis.com/auth/meetings.space.created
const MeetSession = mongoose.model('MeetSession', meetSessionSchema);

export const createMeetSession = (obj) => MeetSession.create(obj)
export const findMeetSession = (obj) => MeetSession.find(obj);
export const findOneMeetSession = (obj) => MeetSession.findOne(obj);
export const updateMeetSession = (query, update) => MeetSession.updateOne(query,update);
