import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';


import { AuthComponent } from "./auth.component";
import { AuthService } from "./auth.service";

describe('BannerComponent (minimal)', () => {
  let comp: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      declarations: [AuthComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(AuthComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(comp).toBeDefined();
  });

  it('#clicked() should toggle #isOn', () => {
    expect(comp.isLoginMode).toBe(true, 'true at first');
    comp.onSwitchMode();
    expect(comp.isLoginMode).toBe(false, 'false, after click');
    comp.onSwitchMode();
    expect(comp.isLoginMode).toBe(true, 'true, after second click');
  });

  it('should find the <button> with fixture.debugElement.nativeElement)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const buttons = bannerEl.querySelectorAll('button')!;

    expect(buttons[0].textContent).toEqual(' Login ');
    expect(buttons[1].textContent).toEqual(' Switch to Sign Up ');

    comp.onSwitchMode();
    fixture.detectChanges();

    expect(buttons[0].textContent).toEqual(' Sign Up ');
    expect(buttons[1].textContent).toEqual(' Switch to Login ');
  });
});