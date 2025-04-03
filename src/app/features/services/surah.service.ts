import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Surah } from '../models/surah';
import { map, Observable } from 'rxjs';
import { SurahApiResponse } from '../models/surah-api-response';
import { surahMapper } from '../mappers/surah-mapper/surah.mapper';

@Injectable({
  providedIn: 'root',
})
export class SurahService {
  apiUrl = environment.endpoint;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Surah[]> {
    return this.http.get<SurahApiResponse[]>(this.apiUrl)
    .pipe(map((response) => response.map(surahMapper)));
  }

  findSurahById(number: number): Observable<Surah> {
    return this.http.get<SurahApiResponse>(`${this.apiUrl}/${number}`)
    .pipe(map(surahMapper));
  }
}
