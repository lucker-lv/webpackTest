module.exports = {
    ident: 'postcss',
    plugins: [
        require('autoprefixer')({browsers:['last 3 versions']})
    ]
}