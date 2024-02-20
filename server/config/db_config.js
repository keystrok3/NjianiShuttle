const { Sequelize } = require("sequelize");


const sequelize_connection = new Sequelize(
    process.env.DB_NAME,
    process.env.USERNAME,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: true        
    }
);


(async () => {
    try {
        await sequelize_connection.authenticate();
        console.log(`Successfully connected to db: ${process.env.DB_NAME} `);
    } catch (error) {
        console.error(`DB Connection unsuccessful`);
    }
})();


module.exports = { sequelize_connection };