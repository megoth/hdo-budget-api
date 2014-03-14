var User = null;

module.exports = function (schema) {
    if (User) {
        return User;
    }
    
    if (!schema) {
        throw new Error('No schema given!');
    }
    
    User = schema.define('User', {
        email: String
    });
    console.log('Defined user schema');
    
    return User;
};