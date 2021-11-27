import { NgModule } from "@angular/core";
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LocationPickerComponent, MapModalComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [LocationPickerComponent, MapModalComponent],
  entryComponents: [MapModalComponent]
})

export class SharedModule {}