import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeaverequestPage } from './leaverequest.page';

describe('LeaverequestPage', () => {
  let component: LeaverequestPage;
  let fixture: ComponentFixture<LeaverequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaverequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaverequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
