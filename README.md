# FIAP TypeScript Challenge

Este repositório contém o código do TypeScript challenge do curso de pós graduação PosTech Full Stack da FIAP.

## Objetivo

O objetivo deste desafio era construir um sistema de gerenciamento de biblioteca utilizando TypeScript. O foco foi criar um CRUD (Create, Read, Update, Delete), que se conecta a um banco de dados, podendo ser NoSQL ou SQL.

## Stack

A stack utilizada para a solução que será descrita a seguir foi:
* NodeJS
* SQLite
* Prisma (ORM)

## Solução

A solução foi desenvolvida utilizando o paradigma de orientação a objetos, onde a aplicação foi separada em interfaces, controllers, services e routers.

### Interfaces

Neste aquivo você poderá encontrar a especificação da modelo de dados utilizado para a interface Livro, de maneira bem simplificada:

```js
export interface LivroInterface {
    titulo: string,
    autor: string,
    isbn: string,
    anoPublicacao: number
}
```

### Services

Neste módulo, a aplicação faz a interface com o controller e adiciona funcionalidades de interface com o banco de dados, como no exemplo da classe `CreateLivroService` a seguir:

```js
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
```

### Controllers

Este módulo é responsável por fazer a interface com a camada da API, utilizando request e response e interagindo com a camada de services. Como um exemplo a classe `CreateLivroController`:

```js
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
```

### Routes

Neste arquivo, utiliza-se `fastify` routes para gerenciar os endpoints de maneira mais organizada, como por exemplo:

```js
fastify.post("/livro", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new CreateLivroController().handle(request, reply);
    })
```

### Server

E, finalmente, o arquivo server para gerenciar a aplicação como um todo através do serviço de API.


