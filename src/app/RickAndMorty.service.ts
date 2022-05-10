import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(private http : HttpClient) { }

  getSuggestions(keyWord:string){
    return this.http.get('https://localhost:5001/RickAndMorty/Suggestions?keyWord='+keyWord)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }

  getCharacter(keyWord:string){
    return this.http.get('https://localhost:5001/RickAndMorty/GetCharacters/'+keyWord)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }

}
