export class Pessoa {
    public id: number;
    public nome: string;
    public idade: number;
    public email: string;

    constructor(id: number, nome: string, idade: number, email: string) {
        this.id = id;
        this.idade = idade;
        this.nome = nome;
        this.email = email;
    }
}

