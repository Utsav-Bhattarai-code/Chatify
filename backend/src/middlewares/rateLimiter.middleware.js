import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,           // max requests per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: false,
        message: "Too many requests, please try again later."
    }
});

export default limiter;
