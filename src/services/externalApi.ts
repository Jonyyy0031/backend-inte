import { RickAndMortyApiResponse, RickAndMortyEpisode } from "../types/apiResponse";

const BASE_URL = 'https://rickandmortyapi.com/api';

export default class ExternalApiService {
    async syncEpisodes(): Promise<RickAndMortyEpisode[]> {
        const allEpisodes: RickAndMortyEpisode[] = [];
        let URL: string | null = `${BASE_URL}/episode`;
        while (URL) {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`Error fetching episodes: ${response.statusText}`);
            }
            const data: RickAndMortyApiResponse = await response.json();
            allEpisodes.push(...data.results);
            URL = data.info.next;
        }
        return allEpisodes;
    }
}