module.exports = function(sequelize, DataTypes) {
    var trade = sequelize.define("trade", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        itemID1: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: sequelize.models.item,
                key: 'id'
            }
        },
        itemID2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: sequelize.models.item,
                key: 'id'
            }
        },
        itemStatus1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 9 },
            defaultValue: 0
        },
        itemStatus2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { min: 0, max: 9 },
            defaultValue: 0
        }
    });

    // trade.associate = function(models) {
    //     trade.hasOne(models.item, { as: 'itemID1'});
    //     trade.hasOne(models.item, { as: 'itemID2'});
    // };
  
    return trade;
  };