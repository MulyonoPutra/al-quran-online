import { Surah } from "../../models/surah";

export interface QuranState {
  surahs: Surah[];
  selectedSurah: Surah | null;
  loading: boolean;
  error: string | null;
}
