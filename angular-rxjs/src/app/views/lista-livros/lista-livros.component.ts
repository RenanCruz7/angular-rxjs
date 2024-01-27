import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, switchMap, throwError } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  campoBusca = new FormControl()
  mensagemErro = ''

  constructor(private service: LivroService) { }

  livrosEncontrador$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA), // delay para que a requisição seja feita
    filter((valorDigitado) => valorDigitado.length >= 3), //aqui a requisição so sera feita quando o valor digitador ser igual ou maior que 3 char 
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((items) =>this.livrosResultadoParaLivros(items)),
    catchError(erro =>{
      return throwError(()=> new Error(this.mensagemErro ='Ops, Ocorreu um erro'))
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item =>{
      return new LivroVolumeInfo(item)
    })
  }
}


