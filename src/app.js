import express from 'express';
import {__dirname, connectToMongo, PORT } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
// import router from './routes/views.router.js';
import routerProducts from './routes/products.router.js';
import routerCarts from './routes/carts.router.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const httpServer = app.listen(PORT,()=>console.log(`listening on http://localhost:${PORT}`));
const io = new Server(httpServer);


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'));

app.use('/api/products',routerProducts);
app.use('/api/carts',routerCarts);

connectToMongo();

let messages = [];
// io.on('connection',socket=>{
//     console.log('nuevo cliente conectado');
//     socket.on('message',data => {
//         messages.push(data);
//         console.log(messages)
//         io.emit('messageLogs',messages);
//     })
// });


