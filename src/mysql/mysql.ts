
import mysql = require('mysql');



export default class MySql {


    private static _instance: MySql;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Cla');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: 'D@n123456',
            database: 'node_db'
        });

        this.conectarDB();
        
    }

    // esto es para prevenir llamar varias veces la misma instancia
    public static get instances() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery( query: string, callback: Function ) {
        this.instances.cnn.query(query, (err, results: Object[], fields ) => {

            if ( err ) {
                console.log("Error en query");
                console.log(err);
                return callback( err );
            }

            if ( results.length === 0 ) {
                callback('El registro solicitado no existe')
            } else {
                callback( null, results );
            }

        })
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {

            if ( err ) {
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('Base de Datos online');

        });
    }


}

