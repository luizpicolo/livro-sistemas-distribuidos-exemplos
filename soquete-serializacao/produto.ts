import { ProdutoInterface } from './produto_interface'; 

class Produto implements ProdutoInterface {
  titulo: string;
  preco: number;
  desconto: number = 0;

  constructor(titulo: string, preco: number) {
    this.titulo = titulo;
    this.preco = preco;
  }

  aplicarDesconto(desconto: number): string {
    return this.calcularDesconto(desconto).toFixed(2);
  }

  calcularDesconto(desconto: number): number {
    return this.preco - (this.preco * desconto / 100);
  }
}

export { Produto };