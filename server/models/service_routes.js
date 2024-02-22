const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize_connection } = require("../config/db_config");


const serviceroutes = [
    "Webuye - Bungoma",
    "Bungoma - Webuye",
    "Kitale - Kisumu",
    "Kisumu - Kitale",
    "Bungoma - Malaba",
    "Malaba - Bungoma",
    "Webuye - Eldoret",
    "Eldoret - Webuye",
];

class ServiceRoutes extends Model {

}


ServiceRoutes.init({

    route_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    journey_start: {
        type: DataTypes.STRING,
    },

    journey_end: {
        type: DataTypes.STRING
    },

    fare: {
        type: DataTypes.INTEGER
    }
}, {

    sequelize: sequelize_connection,
    tableName: 'route',
    modelName: 'ServiceRoutes',

    hooks: {
        afterSync: async () => {
            try {
                const routes_attr = serviceroutes.map(route => {
                    let route_tuple = route.split(" - ");
                    return {
                        route_id: null,
                        journey_start: route_tuple[0],
                        journey_end: route_tuple[1],
                        fare: null
                    }
                })

                await ServiceRoutes.bulkCreate(routes_attr);
                console.log("\n\n Routes list inserted \n\n");
            } catch (error) {
                console.error('\n\n Routes list not inserted: \n\n', error);
            }
        }
    }
});



(async function() {
    try {
        await ServiceRoutes.sync();

        console.log('\n\n ServiceRoutes table created.\n\n');
    } catch (error) {
        console.error('\n\nServiceRoutes table not created: \n\n', error);
    }
})();

module.exports = ServiceRoutes;