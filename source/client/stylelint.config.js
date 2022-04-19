module.exports = {
  customSyntax: 'postcss-scss',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order'
  ],
  rules: {
    'scss/comment-no-empty': null
  }
};
