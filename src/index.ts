
import Koa from 'koa';
import bodyParser from 'koa-body';
import Router from 'koa-router';
import Boom from '@hapi/boom';
import { handlePost } from './routes';




async function start() {
    console.log(`Starting up at ${new Date().toISOString()}`);

    const app = new Koa();

    app.use(bodyParser());

    const router = new Router();


    router.post('/', async (ctx) => {
        
        console.log('POST /');

        // log the url
        console.log(ctx.request.url);

        console.log(ctx.request.body);

        try {
            const response = await handlePost(ctx.request.body);
            ctx.body = response;
            ctx.status = 200;
        }
        catch(err) {

            // check if it is a boom error
            if((err as Boom.Boom).isBoom) {
                
                ctx.body = (err as Boom.Boom).output.payload;
                ctx.status = (err as Boom.Boom).output.statusCode;
            }
            else {
                console.error(err);
                ctx.body = {
                    statusCode: 500,
                    message: 'Internal Server Error'
                };
                ctx.status = 500;
            }
        }
        
    });

    app.use(router.routes());


    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
}


start().catch(console.error);
