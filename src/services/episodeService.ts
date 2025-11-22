import { EpisodeRepository } from "../repository/episodeRepository";
import ExternalApiService from "./externalApi";
import { IEpisode } from "../database/model/Episode";
import { NotFoundError, ConflictError, BadRequestError } from "../shared/errors/errors";

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

    async getEpisodeById(id: number): Promise<IEpisode> {
        if (!id || id <= 0) {
            throw new BadRequestError({ code: 401, message: "Invalid episode ID" }, { "value": id });
        }
        const episode = await this.episodeRepository.findById(id);
        if (!episode) {
            throw new NotFoundError({ code: 404, message: "Episode not found" });
        }
        return episode;
    }

    async createEpisode(episodeData: IEpisode): Promise<IEpisode> {

        if (!episodeData.name || !episodeData.episode || !episodeData.air_date) {
            throw new BadRequestError({
                code: 400,
                message: "Missing required fields"
            }, { "requiredFields": ["name", "episode", "air_date"] });
        }
        const existingEpisode = await this.episodeRepository.findByEpisodeCode(episodeData.episode);

        if (existingEpisode) {
            throw new ConflictError({
                code: 409,
                message: "Episode already exists"
            }, { "episode": episodeData.episode });
        }

        return this.episodeRepository.create(episodeData);
    }

    async updateFavoriteStatus(id: number): Promise<IEpisode | null> {
        if (!id || id <= 0) {
            throw new BadRequestError({ code: 400, message: "Invalid episode ID" },
                { "value": id }
            );
        }

        const episode = await this.episodeRepository.findById(id);

        if (!episode) {
            throw new NotFoundError({ code: 404, message: "Episode not found" });
        }

        const updated = await this.episodeRepository.updateFavoriteStatus(id);
        return updated;
    }

    async deleteEpisode(id: number): Promise<IEpisode | null> {
        if (!id || id <= 0) {
            throw new BadRequestError({ code: 400, message: "Invalid episode ID" }, { "value": id });
        }

        const episode = await this.episodeRepository.findById(id);

        if (!episode) {
            throw new NotFoundError({ code: 404, message: "Episode not found" },);
        }

        const deleted = await this.episodeRepository.delete(id);

        return deleted;
    }
}