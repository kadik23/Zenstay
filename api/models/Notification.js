import mongoose from 'mongoose'    
const {Schema} = mongoose

const NotificationSchema = new Schema({
    type: { type: String, required: true }, // 'CREATE_RESERVATION', 'CANCEL_RESERVATION'
    message: { type: String, required: true },
    details: { type: Object }, // Store booking ID or full object
    isRead: { type: Boolean, default: false }
}, { timestamps: true })

const NotificationModel = mongoose.model('Notification', NotificationSchema)

export default NotificationModel
