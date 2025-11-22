import { Router } from "express";
import { EpisodeController } from "../controller/episodeController";

const router = Router();
const episodeController = new EpisodeController();

router.post('/sync', (req, res, next) => episodeController.syncEpisodes(req, res, next));
router.get('/episodes', (req, res, next) => episodeController.getAllEpisodes(req, res, next));
router.get('/episodes/:id', (req, res, next) => episodeController.getEpisodeById(req, res, next));
router.post('/episodes', (req, res, next) => episodeController.createEpisode(req, res, next));
router.patch('/episodes/:id/favorite', (req, res, next) => episodeController.updateFavoriteStatus(req, res, next));
router.delete('/episodes/:id', (req, res, next) => episodeController.deleteEpisode(req, res, next));

export default router;