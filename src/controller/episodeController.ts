import { Request, Response } from "express";
import { EpisodeService } from "../services/episodeService";

export class EpisodeController {
    private episodeService: EpisodeService;

    constructor() {
        this.episodeService = new EpisodeService();
    }

    async syncEpisodes(req: Request, res: Response): Promise<void> {
        try {
            const episodes = await this.episodeService.syncEpisodes();
            res.status(200).json(episodes);
        } catch (error) {
            res.status(500).json({ message: "Error syncing episodes", error });
        }
    }

    async getAllEpisodes(req: Request, res: Response): Promise<void> {
        try {
            const episodes = await this.episodeService.getAllEpisodes();
            res.status(200).json(episodes);
        } catch (error) {
            res.status(500).json({ message: "Error fetching episodes", error });
        }
    }

    async getEpisodeById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const episode = await this.episodeService.getEpisodeById(id);
            if (episode) {
                res.status(200).json(episode);
            } else {
                res.status(404).json({ message: "Episode not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching episode", error });
        }
    }

    async createEpisode(req: Request, res: Response): Promise<void> {
        try {
            const episodeData = req.body;
            const newEpisode = await this.episodeService.createEpisode(episodeData);
            res.status(201).json(newEpisode);
        } catch (error) {
            res.status(500).json({ message: "Error creating episode", error });
        }
    }

    async updateFavoriteStatus(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const updatedEpisode = await this.episodeService.updateFavoriteStatus(id);
            if (updatedEpisode) {
                res.status(200).json(updatedEpisode);
            } else {
                res.status(404).json({ message: "Episode not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error updating favorite status", error });
        }
    }

    async deleteEpisode(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const deletedEpisode = await this.episodeService.deleteEpisode(id);
            if (deletedEpisode) {
                res.status(200).json(deletedEpisode);
            } else {
                res.status(404).json({ message: "Episode not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting episode", error });
        }
    }
}