import Fastify from 'fastify';
import { routes } from './routes';

const app = Fastify({logger: true});

// Error handling
app.setErrorHandler((error, request, reply) => {
    if (error.message === "Livro não cadastrado.") {
        reply.code(404).send({message: error.message});
    } else {
        reply.code(400).send({message: error.message});
    }
    
})

const start = async () => {

    await app.register(routes);

    try {
        await app.listen({port: 3333});
    } catch(err) {
        process.exit(1);
    }
}

start();