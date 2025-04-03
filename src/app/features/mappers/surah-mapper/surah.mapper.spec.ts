import { Surah } from "../../models/surah";
import { SurahApiResponse } from "../../models/surah-api-response";
import { surahMapper } from "./surah.mapper";


describe('surahMapper', () => {
  it('should correctly map SurahApiResponse to Surah', () => {
    const apiSurah: SurahApiResponse = {
      nomor: 1,
      nama: 'الفاتحة',
      nama_latin: 'Al-Fatihah',
      jumlah_ayat: 7,
      tempat_turun: 'mekah',
      arti: 'Pembukaan',
      deskripsi: 'Surat Al-Fatihah adalah pembukaan dalam Al-Quran.',
      audio: 'https://santrikoding.com/storage/audio/001.mp3'
    };

    const mappedSurah: Surah = surahMapper(apiSurah);

    expect(mappedSurah).toEqual({
      number: 1,
      name: 'الفاتحة',
      latinName: 'Al-Fatihah',
      totalAyahs: 7,
      revelationPlace: 'Mecca',
      meaning: 'Pembukaan',
      description: 'Surat Al-Fatihah adalah pembukaan dalam Al-Quran.',
      audioUrl: 'https://santrikoding.com/storage/audio/001.mp3'
    });
  });

  it('should map "medina" correctly as "Medina"', () => {
    // Arrange: Data dengan tempat_turun "medina"
    const apiSurah: SurahApiResponse = {
      nomor: 2,
      nama: 'البقرة',
      nama_latin: 'Al-Baqarah',
      jumlah_ayat: 286,
      tempat_turun: 'medina',
      arti: 'Sapi Betina',
      deskripsi: 'Surat Al-Baqarah adalah surat terpanjang dalam Al-Quran.',
      audio: 'https://santrikoding.com/storage/audio/002.mp3'
    };

    // Act: Panggil fungsi yang akan diuji
    const mappedSurah: Surah = surahMapper(apiSurah);

    // Assert: Pastikan tempat_turun 'medina' dikonversi menjadi "Medina"
    expect(mappedSurah.revelationPlace).toBe('Medina');
  });
});
