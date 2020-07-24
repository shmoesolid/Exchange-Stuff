module.exports = function(sequelize, DataTypes) {
    var trade = sequelize.define("trade", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        itemID1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemID2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
    
    // category.associate = function(models) {
    //   category.hasMany(models.item, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return trade;
  };