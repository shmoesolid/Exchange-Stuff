module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1, 255] }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8, 255] }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [0, 255] }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [0, 255] }
        },
        emailValidation: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 255] }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [0, 255] }
        }
    });

    user.associate = function(models) {
        user.hasMany(models.item, {
            onDelete: "cascade"
        });
    };
  
    return user;
  };