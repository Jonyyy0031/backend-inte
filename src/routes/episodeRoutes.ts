import { Router } from "express";
import { EpisodeController } from "../controller/episodeController";

const router = Router();
const episodeController = new EpisodeController();

router.post('/sync', (req, res) => episodeController.syncEpisodes(req, res));
router.get('/episodes', (req, res) => episodeController.getAllEpisodes(req, res));
router.get('/episodes/:id', (req, res) => episodeController.getEpisodeById(req, res));
router.post('/episodes', (req, res) => episodeController.createEpisode(req, res));
router.patch('/episodes/:id/favorite', (req, res) => episodeController.updateFavoriteStatus(req, res));
router.delete('/episodes/:id', (req, res) => episodeController.deleteEpisode(req, res));

export default router;