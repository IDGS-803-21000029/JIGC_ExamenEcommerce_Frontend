import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _endpoint: string = environment.endPoint;
  private _apiUrl: string = this._endpoint + 'Productos/';

  constructor(private http: HttpClient) { }

  // Metodo para invocar al endpoint de Catalogo de Produuctos
  getProductos(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${this._apiUrl}ObtenerProductos`);
  }

  // Metodo para invocar al endpoint de Productos Aleatorios
  getProductosRandom(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${this._apiUrl}RandomProductos`);
  }

}
