

/*
 * SCSS specific linting rules.
 *
 * https://github.com/kristerkari/stylelint-scss
 */


export default {
    extends: [
        "./at/each",
        "./at/else",
        "./at/extend",
        "./at/function",
        "./at/import",
        "./at/mixin",
        "./at/rule",
        "./comment",
        "./comment-double-slash",
        "./declaration",
        "./function",
        "./general",
        "./at/if",
        "./map",
        "./media-feature",
        "./operator",
        "./partial",
        "./placeholder",
        "./selector",
        "./variable"
    ].map(require.resolve),
    plugins: [
        "stylelint-scss"
    ]
};
