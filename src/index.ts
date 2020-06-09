
import Server from './server/server';
import router from './router/router';
import MySql from './mysql/mysql';


const server = Server.init( 3000 );
server.app.use( router );

// MySql Instance
MySql.instances;

server.start(() => {
    console.log("Servidor corriendo en el puerto 3000");
})
