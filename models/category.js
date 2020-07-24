module.exports = function(sequelize, DataTypes) {
    var category = sequelize.define("category", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1] }
        }
    });
    
    // category.associate = function(models) {
    //   category.hasMany(models.item, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return category;
  };