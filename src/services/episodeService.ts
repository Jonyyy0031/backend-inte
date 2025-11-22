import { EpisodeRepository } from "../repository/episodeRepository";
import ExternalApiService from "./externalApi";
import { IEpisode } from "../database/model/Episode";

export class EpisodeService {
    private episodeRepository: EpisodeRepository;
    private externalApiService: ExternalApiService;

    constructor() {
        this.episodeRepository = new EpisodeRepository();
        this.externalApiService = new ExternalApiService();
    }

    async syncEpisodes(): Promise<IEpisode[]> {
        const episodesData = await this.externalApiService.syncEpisodes();
        await this.episodeRepository.bulkCreate(episodesData);
        return this.episodeRepository.findAll();
    }

    async getAllEpisodes(): Promise<IEpisode[]> {
        return this.episodeRepository.findAll();
    }

    async getEpisodeById(id: number): Promise<IEpisode | null> {
        return this.episodeRepository.findById(id);
    }

    async createEpisode(episodeData: IEpisode): Promise<IEpisode> {
        return this.episodeRepository.create(episodeData);
    }

    async updateFavoriteStatus(id: number): Promise<IEpisode | null> {
        return this.episodeRepository.updateFavoriteStatus(id);
    }

    async deleteEpisode(id: number): Promise<IEpisode | null> {
        return this.episodeRepository.delete(id);
    }
}