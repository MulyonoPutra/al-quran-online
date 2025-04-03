import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurahComponent } from './surah.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SurahComponent],
  exports: [SurahComponent],
})
export class SurahModule {}
