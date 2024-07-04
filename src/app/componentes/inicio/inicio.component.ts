import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { IProducto } from '../../interfaces/Producto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgFor, HttpClientModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  listaProductos: IProducto[] = [];

  constructor(private productoService: ProductoService) {
    this.obtenerProductosRandom();
  }

  // Metodo para obtener productos relevantes
  obtenerProductosRandom() {
    this.productoService.getProductosRandom().subscribe({
      next: (data) => {
        this.listaProductos = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
