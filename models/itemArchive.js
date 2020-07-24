module.exports = function(sequelize, DataTypes) {
    var itemArchive = sequelize.define("itemArchive", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true }, //, autoIncrement: false },
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

    itemArchive.associate = function(models) {
        itemArchive.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });

        itemArchive.hasOne(models.category, {
            foreignKey: {
                allowNull: true
            }
        });
    }
  
    return itemArchive;
  };