import { Request, Response, NextFunction } from "express";
import { EpisodeService } from "../services/episodeService";

export class EpisodeController {
    private episodeService: EpisodeService;

    constructor() {
        this.episodeService = new EpisodeService();
    }

    async syncEpisodes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const episodes = await this.episodeService.syncEpisodes();
            res.status(200).json(episodes);
        } catch (error) {
            next(error);
        }
    }

    async getAllEpisodes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const episodes = await this.episodeService.getAllEpisodes();
            res.status(200).json(episodes);
        } catch (error) {
            next(error);
        }
    }

    async getEpisodeById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const episode = await this.episodeService.getEpisodeById(id);
            res.status(200).json(episode);
        } catch (error) {
            next(error);
        }
    }

    async createEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const episodeData = req.body;
            const newEpisode = await this.episodeService.createEpisode(episodeData);
            res.status(201).json(newEpisode);
        } catch (error) {
            next(error);
        }
    }

    async updateFavoriteStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const updatedEpisode = await this.episodeService.updateFavoriteStatus(id);
            res.status(200).json(updatedEpisode);
        } catch (error) {
            next(error);
        }
    }

    async deleteEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            await this.episodeService.deleteEpisode(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}