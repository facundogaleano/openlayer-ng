import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir las credenciales de autenticación
const username = 'admin';
const password = 'geoserver';

// Codificar las credenciales en base64
const credentials = `${username}:${password}`;
const encodedCredentials = btoa(credentials);

// Construir los encabezados de la solicitud
const headers = new HttpHeaders({
  //'Content-Type': 'application/json',
  'Authorization': `Basic ${encodedCredentials}`
});
console.log(headers)

@Injectable({
  providedIn: 'root'
})
export class GeoserverService {
  private baseUrl = "http://localhost:8080/geoserver/";
  

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    const completeUrl = this.baseUrl + url;
    return this.http.get<T>(completeUrl, { headers });
  }

  
}
