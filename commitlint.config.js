module.exports = {
    extends: ['@commitlint/config-angular'],
    'rules': {
        'type-empty': [0, 'always'],
        'subject-empty': [0, 'always'],
        'type-case': [2, 'always', 'lower-case'],
        'scope-case': [0, 'always']
    }
};
