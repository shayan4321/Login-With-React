module.exports = (sequelize, DataTypes) => {

    const UserSchema = sequelize.define("userschema", {
        username: {
            type: DataTypes.STRING,
            required: [true, "Please Provide Unique Username"],
            unique: [true, "Username Exist"]
        },
        passwprd: {
            type: DataTypes.STRING,
            required: [true, "Please Provide a Password"],
            unique: false,
        },
        email: {
            type: DataTypes.STRING,
            required: [true, "Please Provide a unique email"],
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.NUMBER
        },
        address: {
            type: DataTypes.STRING
        },
        profile: {
            type: DataTypes.STRING
        }
    
    })

    return UserSchema

}