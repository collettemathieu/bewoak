// // app.spec.ts (ou app.component.spec.ts)
// import { TestBed } from '@angular/core/testing';
// import { RouterModule } from '@angular/router';
// import { beforeEach, describe, expect, test } from 'bun:test';
// import { App } from './app';

// describe('App (standalone)', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [App, RouterModule.forRoot([])],
//     }).compileComponents();
//   });

//   test('should create the component', () => {
//     const fixture = TestBed.createComponent(App);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   test('should have the default title', () => {
//     const fixture = TestBed.createComponent(App);
//     const app = fixture.componentInstance as App;
//     expect((app as any).title).toBe('client');
//   });

//   // Dé-commente ce test uniquement si le template affiche bien {{ title }}
//   // it('should render the title in the DOM', () => {
//   //   const fixture = TestBed.createComponent(App);
//   //   fixture.detectChanges();
//   //   const el: HTMLElement = fixture.nativeElement;
//   //   expect(el.textContent).toContain('client');
//   // });
// });
