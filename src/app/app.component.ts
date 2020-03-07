import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud';
  pessoaLista: Array<Pessoa> = [];
  novaPessoa: Pessoa;
  nome = '';
  idade = 0;
  id = 0;
  email = '';
  mostrarFormulario = false;
  editar = false;
  nomeCurso = '';
  data: Date;
  alterar = true;
  mes: string[];
  raiz: number;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.recuperarPessoas();
    this.nomeCurso = 'ANGULAR';
    this.data = new Date();
    this.mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'];
    this.raiz = 81;
  }

  recuperarPessoas() {
    this.pessoaService.recuperarPessoas()
      .subscribe(
        response => this.pessoaLista = response,
        error => console.log(error)
      );
  }

  adicionarPessoa() {
    this.mostrarFormulario = true;
    this.editar = false;
    this.nome = '';
    this.idade = null;
    this.id = null;
    this.email = '';
  }

  salvar() {
    this.novaPessoa = new Pessoa(this.id, this.nome, this.idade, this.email);

    if (!this.editar) {
      this.pessoaService.adicionarPessoa(this.novaPessoa)
        .subscribe(
          res => {
            this.pessoaLista.push(this.novaPessoa);
            this.mostrarFormulario = false;
          },
          err => alert('Erro ao Salvar')
        );
    } else {
      this.pessoaService.editarPessoa(this.novaPessoa)
        .subscribe(
          res => {
            this.mostrarFormulario = false;
            const indexPessoa = this.pessoaLista.findIndex(x => x.id === this.novaPessoa.id);
            this.pessoaLista[indexPessoa] = this.novaPessoa;
          },
          err => alert('Erro ao Editar')
        );
    }
  }

  editarPessoa(pessoa: Pessoa) {
    this.id = pessoa.id;
    this.nome = pessoa.nome;
    this.idade = pessoa.idade;
    this.email = pessoa.email;
    this.mostrarFormulario = true;
    this.editar = true;
  }

  removerPessoa(id: number) {
    this.pessoaService.removerPessoa(id)
      .subscribe(
        res => {
          this.pessoaLista = this.pessoaLista.filter(pes => pes.id !== id);
        },
        err => alert('Erro ao deletar')
      );
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.editar = false;
    this.nome = '';
    this.idade = null;
    this.id = null;
    this.email = '';
  }

  get formato() {
    return this.alterar ? 'shortDate' : 'fullDate';
  }
  alterarFormato() {
    this.alterar = !this.alterar;
  }

}
