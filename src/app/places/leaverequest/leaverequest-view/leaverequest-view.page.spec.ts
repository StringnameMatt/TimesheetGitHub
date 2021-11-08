import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeaverequestViewPage } from './leaverequest-view.page';

describe('LeaverequestViewPage', () => {
  let component: LeaverequestViewPage;
  let fixture: ComponentFixture<LeaverequestViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaverequestViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaverequestViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
