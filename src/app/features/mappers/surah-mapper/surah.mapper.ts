import { Surah } from "../../models/surah";
import { SurahApiResponse } from "../../models/surah-api-response";

export function surahMapper(apiSurah: SurahApiResponse): Surah {
  return {
    number: apiSurah.nomor,
    name: apiSurah.nama,
    latinName: apiSurah.nama_latin,
    totalAyahs: apiSurah.jumlah_ayat,
    revelationPlace: apiSurah.tempat_turun === 'mekah' ? 'Mecca' : 'Medina',
    meaning: apiSurah.arti,
    description: apiSurah.deskripsi,
    audioUrl: apiSurah.audio
  }
}
