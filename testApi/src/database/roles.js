const { getRandomId } = require('../utils/helperUtils');

const DEFAULT_ROLE = Object.freeze({
    id: getRandomId(),
    name: 'User',
    color: '#5590C3',
});

const ADMIN_ROLE = Object.freeze({
    id: getRandomId(),
    name: 'Admin',
    color: '#963CCC',
});

const createAccountRole = function (role = {}) {
    return {
        id: role.id ?? DEFAULT_ROLE.id,
        name: role.name ?? DEFAULT_ROLE.name,
        color: role.color ?? DEFAULT_ROLE.color,
    };
};

const roles = [createAccountRole(ADMIN_ROLE), createAccountRole(DEFAULT_ROLE)];

module.exports = {
    DEFAULT_ROLE,
    ADMIN_ROLE,
    createAccountRole,
    roles,
};
