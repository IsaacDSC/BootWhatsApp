const app = require('@/app')

function configHandlebars() {
    app.engine('hbs', hbs({ defaultLayout: 'main.hbs', extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set("views", path.join(__dirname, "/views/")) //resolvendo problema, direcionando views para dentro de src
}