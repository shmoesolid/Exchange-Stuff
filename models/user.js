
var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
                isEmail: true,
                len: [1, 255] 
            }
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
        tokenValidation: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 255] }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [0, 255] }
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 9 },
            defaultValue: 0
        }
    });

    user.associate = function(models) {
        user.hasMany(models.item, {
            onDelete: "cascade"
        });
    };

    user.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    user.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
  
    return user;
  };