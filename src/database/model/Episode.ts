import mongoose, { Document, Schema } from 'mongoose';

export interface IEpisode extends Document {
    id: number;
    name: string;
    episode: string;
    air_date: string;
    favorite: boolean;
}

const EpisodeSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    episode: { type: String, required: true },
    air_date: { type: String, required: true },
    favorite: { type: Boolean, default: false },
});

export const EpisodeModel = mongoose.model<IEpisode>('Episode', EpisodeSchema);