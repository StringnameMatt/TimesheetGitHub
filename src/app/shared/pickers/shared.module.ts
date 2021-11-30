import { NgModule } from "@angular/core";
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './image-picker/image-picker.component';

@NgModule({
  declarations: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
  entryComponents: [MapModalComponent]
})

export class SharedModule {}