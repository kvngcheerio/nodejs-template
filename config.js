// Import env package
require("dotenv").config({silent: true});


module.exports = {
    port: process.env.PORT || 9000,
    env: process.env.NODE_ENV || "development",
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/nodejs_db",
    secretKey: process.env.SECRET_KEY || '_secret_key_',
    defaultRecordsPerPage: process.env.DEFAULT_RECORDS_PER_PAGE || 10,
    defaultPage: process.env.DEFAULT_PAGE || 1,
    sentryDsn: process.env.SENTRY_DSN || "",
    authSecret: process.env.AUTH_SECRET || '_secret_key_',
   
};
