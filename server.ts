import createApp from './src/app';
import { env } from './src/config/env';

const app = await createApp();

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});