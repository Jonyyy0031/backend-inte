import { IEpisode, EpisodeModel } from "../database/model/Episode";
import { RickAndMortyEpisode } from "../types/apiResponse";

export class EpisodeRepository {
    async findAll(): Promise<IEpisode[]> {
        return EpisodeModel.find();
    }

    async findById(id: number): Promise<IEpisode | null> {
        return EpisodeModel.findOne({ id });
    }

    async findByEpisodeCode(episodeCode: string): Promise<IEpisode | null> {
        return EpisodeModel.findOne({ episode: episodeCode });
    }
    
    async create(episodeData: IEpisode): Promise<IEpisode> {
        const lastEpisode = await EpisodeModel.findOne().sort({ id: -1 });
        const newId = lastEpisode ? lastEpisode.id + 1 : 1;
        const episode = new EpisodeModel({
            id: newId,
            name: episodeData.name,
            episode: episodeData.episode,
            air_date: episodeData.air_date,
            favorite: episodeData.favorite || false,
        });
        return episode.save();
    }

    async bulkCreate(episodes: RickAndMortyEpisode[]): Promise<void> {
        const normalizedEpisodes = episodes.map(ep => ({
            updateOne: {
                filter: { id: ep.id },
                update: {
                    $setOnInsert: {
                        id: ep.id,
                        name: ep.name,
                        episode: ep.episode,
                        air_date: ep.air_date,
                        favorite: false,
                    }
                },
                upsert: true,
            }
        }));
        await EpisodeModel.bulkWrite(normalizedEpisodes)
    }
    async updateFavoriteStatus(id: number): Promise<IEpisode | null> {
        const episode = await this.findById(id);
        if (!episode) {
            return null;
        }
        episode.favorite = !episode.favorite;
        return episode.save();
    }
    async delete(id: number): Promise<IEpisode | null> {
        return EpisodeModel.findOneAndDelete({ id });
    }
}