import { Component } from '@angular/core';
import { AngularImageCarouselComponent } from 'angular-image-carousel';
import { CarouselItem } from 'angular-image-carousel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [AngularImageCarouselComponent]
})
export class AppComponent {
  // The images array can be customized or loaded dynamically
  data: CarouselItem[] = [
    {
      mediaUrl: '../assets/img2.jpg',
      redirectUrl: 'https://www.youtube.com/embed/jwnez8HdN7E?si=4VmRqZdQ7UYBQ0MB',
      title: 'Product Name',
      description: 'Product description'
    },
	{
		mediaUrl: '../assets/img3.jpg',
		title: 'Product Name',
		description: 'Product description'
	},
    {
      mediaUrl: 'https://www.youtube.com/embed/jwnez8HdN7E?si=4VmRqZdQ7UYBQ0MB',
      thumbnailUrl: '../assets/img1.jpg'
    },
    {
      mediaUrl: 'https://www.youtube.com/embed/jwnez8HdN7E?si=4VmRqZdQ7UYBQ0MB'
    }
  ];
}
