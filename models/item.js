module.exports = function(sequelize, DataTypes) {
    var item = sequelize.define("item", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1, 64] }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1, 255] }
        },
        minValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 999999999 }
        },
        maxValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 999999999 }
        },
        deniedItems: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    item.associate = function(models) {
        item.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });

        item.hasOne(models.category, {
            foreignKey: {
                allowNull: true
            }
        });

        // item.belongsTo(models.trade, {
        //     as: 'itemID1'
        // });

        // item.belongsTo(models.trade, {
        //     as: 'itemID2'
        // });
    }
  
    return item;
  };