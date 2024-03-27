// import prisma from "../../prisma";
import { LivroInterface } from "./interfaces";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
export class CreateLivroService {
    async execute({autor, titulo, isbn, anoPublicacao} : LivroInterface) {

        const livro = prisma.livro.create({
            data: {
                autor,
                titulo,
                isbn,
                anoPublicacao
            }
        });

        return livro;
    }
}

export class ListLivroService {
    async execute() {
        const livros = await prisma.livro.findMany();
        return livros;
    }
}

export class ReadLivroService {
    async execute(id: string) {
        const livro = await prisma.livro.findFirst({
            where: {id: parseInt(id)}
        })

        if (!livro) {
            throw new Error("Livro não cadastrado.");
        }

        return livro;
    }
}

export class DeleteLivroService {
    async execute(id: string) {
        
        const livro = await prisma.livro.findFirst({
            where: {id: parseInt(id)}
        })

        if (!livro) {
            throw new Error("Livro não cadastrado.")
        }

        await prisma.livro.delete({
            where: {id: parseInt(id)}
        })

        return {message: "Livro deletado com sucesso."}
    }
}

export class UpdateLivroService {
    async execute({autor, titulo, isbn, anoPublicacao} : LivroInterface, id: string) {
        const livro = await prisma.livro.findFirst({
            where: {id: parseInt(id)}
        })

        if (!livro) {
            throw new Error("Livro não cadastrado.");
        }

        const update = await prisma.livro.update({
            where: {id: parseInt(id)},
            data: {
                autor,
                titulo,
                isbn,
                anoPublicacao
            }
        });

        return update;
    }
}