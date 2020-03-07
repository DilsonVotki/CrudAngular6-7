import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from './pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  //EXEMPLO 
  //url - http://www.google.com.br/
  // post, put, get, delete
  private readonly API = 'http://localhost:3000/pessoas';
  constructor(private http: HttpClient) { }

  recuperarPessoas() {
    return this.http.get<Pessoa[]>(this.API);
  }

  adicionarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post(this.API, pessoa);
  }

  editarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.put(this.API + '/' + pessoa.id, pessoa);
  }

  removerPessoa(id: number): Observable<any> {
    return this.http.delete(this.API + '/' + id);
  }
}
