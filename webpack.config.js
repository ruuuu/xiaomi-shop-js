const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),  // в ппаке src лежат нижеоисанные js файлы
    entry: {                                   // 3 точки входа (для каждой страницы: index.html,  catalog.html, admin.html)
        main: './index.js',
        catalog: './catalog.js',
        admin: './admin.js',
    },
    output: { // папка dist:
        filename: './js/[name].js',                 // точка выхода, это файл будет создаваться  в папке dist. Файл будет содержать сжатый оптимизорованный код из всех js-модулей
        path: path.resolve(__dirname, 'dist')       // в какую папку кладем js файл
    },
    devServer: {
        hot: true,
        static: {
            directory: './dist',                    // из папки dist зарускаеются все html фйлы
            watch: true
        }
    }
};