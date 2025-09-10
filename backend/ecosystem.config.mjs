export default {
    apps: [
        {
            name: "url-backend",
            script: "dist/index.js",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "PRODUCTION",
                DB_URL: "postgresql://postgres:callmegautam@localhost:5432/url-shortner",
                FRONTEND_URL: "http://localhost:5173/",
                BACKEND_URL: "https://api.gautamsuthar.in/url",
                PORT: "3001",
            },
            env_production: {
                NODE_ENV: "PRODUCTION",
                DB_URL: "postgresql://postgres:yourpassword@localhost:5432/url-shortner?schema=public",
                FRONTEND_URL: "http://localhost:5173/",
                BACKEND_URL: "https://api.gautamsuthar.in/url/",
                PORT: "3001",
            },
        },
    ],
};
