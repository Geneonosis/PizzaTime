import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {
  ngOnInit() {
    console.log('PageNotFoundComponent initialized');
  }

  ngOnDestroy() {
    console.log('PageNotFoundComponent destroyed');
  }
}
