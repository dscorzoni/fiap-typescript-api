import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyRequest, 
    FastifyReply } from "fastify";

import { 
    CreateLivroController, 
    DeleteLivroController, 
    ListLivroController, 
    ReadLivroController, 
    UpdateLivroController } from "./controllers";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/livro/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReadLivroController().handle(request, reply);
    })
    
    fastify.post("/livro", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new CreateLivroController().handle(request, reply);
    })

    fastify.get("/livros", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new ListLivroController().handle(request, reply);
    })

    fastify.delete("/livro/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteLivroController().handle(request, reply);
    })

    fastify.put("/livro/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateLivroController().handle(request, reply);
    })
}