import "dotenv/config";

export const ENV = {
    PORT : process.env.PORT,
    MONGO_URL : process.env.MONGO_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    NODE_ENV : process.env.NODE_ENV,
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS,
    CLOUD_NAME : process.env.CLOUD_NAME,
    API_KEY : process.env.API_KEY,
    API_SECRET : process.env.API_SECRET
}
