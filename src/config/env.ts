import "dotenv/config";

const requiredEnvVars = (name: string):string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required but not set.`);
    }
    return value;
}

export const env = {
    MONGODB_URI: requiredEnvVars('MONGODB_URI'),
    PORT: Number(process.env.PORT || 3000),
}