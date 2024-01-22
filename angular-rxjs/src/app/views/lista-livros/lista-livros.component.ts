import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  campoBusca: string = ''
  subscription: Subscription

  constructor(private service: LivroService) { }

  // todo service retorna um observable afim de gastar menos recursos é normal usar o metodo unsubscribe para isso, para
  // cancelar a assinatura do metodo de busca na API
  buscarLivros() {
    this.service.buscar(this.campoBusca).subscribe({
      next: retornoAPi => console.log(retornoAPi),
      error: erro => console.error(erro),
      complete: () => console.log("completado")
    })
  }
  // cancela as execuções do observable
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}



