import { QuranState } from "../models/quran-state.model";

export const initialQuranState: QuranState = {
  surahs: [],
  selectedSurah: null,
  loading: false,
  error: null,
};
