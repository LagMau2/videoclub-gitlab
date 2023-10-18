module.exports = (sequelize, type)=>{
    const Copy = sequelize.define('copies', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        number: type.INTEGER,
        format: {
            type: type.ENUM,
            values: ['CD', 'DVD'] 
        },
        status: {
            type: type.ENUM,
            values: ['Available', 'Checked Out', 'Damaged'] 
        }
    });
    return Copy;
}