import { FastifyRequest, FastifyReply } from "fastify";
import { CreateLivroService, DeleteLivroService, ListLivroService, ReadLivroService, UpdateLivroService } from "./services";
import { LivroInterface } from "./interfaces";


export class CreateLivroController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {titulo, autor, isbn, anoPublicacao} = request.body as LivroInterface;

        // Checking if all fields where provided
        if (!autor || !titulo || !isbn || !anoPublicacao) {
            reply.status(400).send({"message": "Preencha todos os campos!"});
        }

        const livroService = new CreateLivroService();
        const livro = await livroService.execute({titulo, autor, isbn, anoPublicacao});
        reply.send(livro);
    }
} 


export class ListLivroController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const livroService = new ListLivroService();
        const livros = await livroService.execute();
        reply.send(livros);
    }
}

export class ReadLivroController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const livroService = new ReadLivroService();
        const livro = await livroService.execute(id);
        reply.send(livro);
    }
}

export class DeleteLivroController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const livroService = new DeleteLivroService();
        const livro = await livroService.execute(id);
        reply.send(livro);
    }
}


export class UpdateLivroController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const {titulo, autor, isbn, anoPublicacao} = request.body as LivroInterface;

        // Checking if all fields where provided
        if (!autor || !titulo || !isbn || !anoPublicacao) {
            reply.status(400).send({"message": "Preencha todos os campos!"});
        }

        const livroService = new UpdateLivroService();
        const livro = await livroService.execute({titulo, autor, isbn, anoPublicacao}, id);
        reply.send(livro);
    }
} 