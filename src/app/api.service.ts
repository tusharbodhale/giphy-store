import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  APIKEY = '71u2e0zHRVd03qb4DfcjMDYWhltcHxWj';

  constructor(private http: HttpClient) { }

  searchAPI(searchParams: any){
    return this.http
    .get(`https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&q=${searchParams.q}&limit=${searchParams.limit}&offset=${searchParams.offset}&rating=g&lang=en`,
    {responseType: 'json'});
  }
}
