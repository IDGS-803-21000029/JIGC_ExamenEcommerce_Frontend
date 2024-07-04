import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProducto } from '../../interfaces/Producto';
import { ProductoService } from '../../servicios/producto.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, NgFor, HttpClientModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  public searchText: string = '';
  public selectedCategory: string = 'all';
  isResultLoaded = false;
  listaProductos: IProducto[] = [];

  constructor(private productoService: ProductoService) {
    this.obtenerProductos();
  }

  // Metodo para obtener los productos mediante el servicio
  obtenerProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.isResultLoaded = true;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  // Metodo para filtrar los productos por medio de la barra de busqueda y de radio button
  filteredProducts(): IProducto[] {
    const searchText = this.searchText ? this.searchText.toLowerCase() : '';
  
    // Filtrar la lista de productos.
    return this.listaProductos.filter(product => {
      const nombre = product.nombre ? product.nombre.toLowerCase() : '';
      const descripcion = product.descripcion ? product.descripcion.toLowerCase() : '';
      const matchesSearchText = searchText
        ? nombre.includes(searchText) || descripcion.includes(searchText)
        : true;
      const matchesCategory = this.selectedCategory === 'all' || product.categoria === this.selectedCategory;
      return matchesSearchText && matchesCategory;
    });
  }
  
  
}
