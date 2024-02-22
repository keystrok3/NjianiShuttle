const { Model, DataTypes } = require("sequelize");
const { sequelize_connection } = require("../config/db_config");


class Destination extends Model {

}

// attributes: location_name
Destination.init({

    location_name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, {
    sequelize: sequelize_connection,
    tableName: 'destination',
    modelName: "Destination",

    hooks: {
        afterSync: async () => {
            if(await Destination.count() > 0) {
                return;
            }
            const destinations = [ "Webuye", "Bungoma", "Kakamega", "Kisumu", "Kitale", "Eldoret", "Malaba" ];
            
            try {
                const destinationObjects = destinations.map(location_name => ({ location_name }));
                await Destination.bulkCreate(destinationObjects);
    
                console.log('\n\n List inserted \n\n');
            } catch (error) {
                console.log('\n\n Could not insert destination list \n\n');
            }
        }
    }
});



(async () => {
    try {
        await Destination.sync();

        console.log('Destination Table Created');
        
    } catch (error) {
        console.log('\n\nCould not create table.\n\n')
    }
})()


module.exports = Destination;