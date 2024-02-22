const { Model, DataTypes } = require("sequelize");
const { sequelize_connection } = require("../config/db_config");
const { bulkCreate } = require("./destinations");



class Car extends Model {

}

const cars = [
    "KAJ 632A",
    "KBF 941B",
    "KCM 853C",
    "KDL 724D",
    "KEW 625E",
    "KFG 536F",
    "KGH 417G",
    "KHI 308H",
    "KIJ 219I",
    "KJK 120J"
  ];

Car.init({
    registration: {
        type: DataTypes.STRING,
        primaryKey: true
    },

    current_station: {
        type: DataTypes.STRING,
    },

    departure_time: {
        type: DataTypes.DATE,
    }
}, {
    sequelize: sequelize_connection,
    tableName: 'car',
    modelName: 'Car',

    hooks: {
        afterSync: async () => {
            
            if(await Car.count() > 0) return;

            const carObjects = cars.map((value) => ({ registration: value }));
            try {
                await Car.bulkCreate(carObjects);

                console.log('\n\n Car list inserted \n\n')
            } catch (error) {
                console.log('Car list not inserted', error);
            }
        }
    }
});


(async () => {
    try {
        await Car.sync();

        console.log("\n\n car table created \n\n");
    } catch (error) {
        console.error('\n\n car table not created: \n', error);
    }
})();


module.exports = Car;