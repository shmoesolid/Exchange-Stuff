module.exports = function(sequelize, DataTypes) {
    var trade = sequelize.define("trade", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        itemStatus1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 15 }
        },
        itemStatus2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { min: 0, max: 15 }
        }
    });

    trade.associate = function(models) {
        trade.hasOne(models.item, {
            foreignKey: {
                name: 'itemID1',
                allowNull: false
            }
        });

        trade.hasOne(models.item, {
            foreignKey: {
                name: 'itemID2',
                allowNull: false
            }
        });
    };
  
    return trade;
  };