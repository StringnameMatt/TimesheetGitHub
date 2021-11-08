import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewJobSitePage } from './new-job-site.page';

describe('NewJobSitePage', () => {
  let component: NewJobSitePage;
  let fixture: ComponentFixture<NewJobSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJobSitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewJobSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
