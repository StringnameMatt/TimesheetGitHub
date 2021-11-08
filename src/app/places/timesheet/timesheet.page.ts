import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.page.html',
  styleUrls: ['./timesheet.page.scss'],
})
export class TimesheetPage implements OnInit {
  loadedPlaces: Place[];
  date = new Date().toLocaleDateString();
  time = new Date().toLocaleTimeString();

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

}
