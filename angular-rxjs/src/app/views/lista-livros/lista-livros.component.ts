import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = ''
  subscription: Subscription
  livro: Livro

  constructor(private service: LivroService) { }

  // todo service retorna um observable afim de gastar menos recursos é normal usar o metodo unsubscribe para isso, para
  // cancelar a assinatura do metodo de busca na API
  buscarLivros() {
    this.service.buscar(this.campoBusca).subscribe({
      next: (items) => this.listaLivros = this.livrosResultadoParaLivros(items),
      error: erro => console.error(erro),
    })
  }


  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item =>{
      return new LivroVolumeInfo(item)
    })
  }


  // cancela as execuções do observable
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}


