module.exports = function(sequelize, DataTypes) {
    const Organization = sequelize.define('Organization', {

        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        organization_id: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        website: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        country: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        founded: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        
        industry: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        
        no_of_employees: {
            type: DataTypes.INTEGER(200),
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, { tableName: 'organizations', timestamps: false });

    return Organization;
}