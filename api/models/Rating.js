import mongoose from 'mongoose';

const { Schema } = mongoose;

const RatingSchema = new Schema({
    booking_id: { type: String, required: true, unique: true },
    room_id: { type: String, required: true },
    user_id: { type: String, required: true },
    overallRating: { type: Number, required: true },
    ratings: {
        cleanliness: { type: Number, default: null },
        comfort: { type: Number, default: null },
        air_conditioning: { type: Number, default: null },
        free_wifi: { type: Number, default: null },
        smart_tv: { type: Number, default: null },
        key_card_access: { type: Number, default: null },
        bathroom: { type: Number, default: null },
    },
    comment: { type: String, default: "" }
}, { timestamps: true });

const RatingModel = mongoose.model('Rating', RatingSchema);

export default RatingModel;
