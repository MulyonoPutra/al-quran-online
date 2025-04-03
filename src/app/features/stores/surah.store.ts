import { Injectable } from '@angular/core';
import { SurahService } from '../services/surah.service';
import { QuranState } from './models/quran-state.model';
import { initialQuranState } from './state/initial-quran-state';
import { ComponentStore } from '@ngrx/component-store';
import { Surah } from '../models/surah';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuranStore extends ComponentStore<QuranState> {
  constructor(private quranApiService: SurahService) {
    super(initialQuranState);
  }

  readonly surahs$ = this.select((state) => state.surahs);
  readonly selectedSurah$ = this.select((state) => state.selectedSurah);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);

  readonly setSurahs = this.updater((state: QuranState, surahs: Surah[]) => ({
    ...state,
    surahs,
    loading: false,
    error: null,
  }));

  readonly setSelectedSurah = this.updater(
    (state: QuranState, surah: Surah) => ({
      ...state,
      selectedSurah: surah,
      loading: false,
      error: null,
    })
  );

  readonly setLoadingState = this.updater(
    (state: QuranState, loading: boolean) => ({
      ...state,
      loading,
      error: null,
    })
  );

  readonly setErrorState = this.updater((state: QuranState, error: string) => ({
    ...state,
    loading: false,
    error,
  }));

  readonly loadSurahs = this.effect(() => {
    this.setLoadingState(true);
    return this.quranApiService.findAll().pipe(
      tap({
        next: (surahs) => this.setSurahs(surahs),
        error: (error) => this.setErrorState(error.message),
      })
    );
  });

  readonly loadSurahById = this.effect((id$: Observable<number>) =>
    id$.pipe(
      tap(() => this.setLoadingState(true)),
      switchMap((id) =>
        this.quranApiService.findSurahById(id).pipe(
          tap({
            next: (surah) => this.setSelectedSurah(surah),
            error: (error) => this.setErrorState(error.message),
          })
        )
      )
    )
  );
}
