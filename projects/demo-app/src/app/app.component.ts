import { Component } from '@angular/core';
import { AngularImageCarouselComponent } from 'angular-image-carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [AngularImageCarouselComponent]
})
export class AppComponent {
  // The images array can be customized or loaded dynamically
  images: string[] = [
    'https://shop.amul.com/s/62fa94df8c13af2e242eba16/6523d2697dd6b176ec646ba2/03-bop_amul-whey-protein-960g-1024x1024.png',
	'../assets/img1.jpg',
	'../assets/img2.jpg',
	'../assets/img3.jpg',
  ];
}
