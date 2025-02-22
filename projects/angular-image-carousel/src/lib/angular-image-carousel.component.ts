import {
  Component,
  Input,
  signal,
  computed,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItem, MediaType } from './interfaces/carousel-item.interface';
import { SafePipe } from './pipes/safe.pipe';

@Component({
  selector: 'lib-angular-image-carousel',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './angular-image-carousel.component.html',
  styleUrls: ['./angular-image-carousel.component.css'],
})
export class AngularImageCarouselComponent implements OnInit, OnDestroy {
  /**
   * List of data.
   */
  @Input() data: CarouselItem[] = [];

  /**
   * Whether the carousel loops when reaching either end.
   */
  @Input() loop: boolean = true;

  /**
   * Width and height for the main (center) image.
   */
  @Input() width = 60;
  @Input() height = 300;



  /**
   * Whether to show next/prev navigation arrows.
   */
  @Input() showArrows = true;

  /**
   * Whether to show the radio buttons for selecting images.
   */
  @Input() showRadioButtons = true;

  /**
   * Index of the currently selected image.
   */
  currentIndex = signal(0);



  // Track positions of all images
  positions = signal<('far-left' | 'left' | 'center' | 'right' | 'far-right' | 'hidden')[]>([]);


  ngOnInit(): void {
    this.updatePositions();
  }

  private updatePositions(): void {
    const current = this.currentIndex();
    const newPositions = this.data.map((_, index) => {
        if (index === current) return 'center';
        if (index === this.prevIndex()) return 'left';
        if (index === this.nextIndex()) return 'right';
        if (index < this.prevIndex()) return 'far-left';
        if (index > this.nextIndex()) return 'far-right';
        return 'hidden';
    });
    this.positions.set(newPositions);
  }

  ngOnDestroy(): void {}


   /**
   * Compute the next/prev index with wrapping (if loop is true).
   */

  prevIndex = computed(() => {
    if (!this.loop && this.currentIndex() === 0) {
      return 0; // or hide neighbor if not looping
    }
    return (this.currentIndex() - 1 + this.data.length) % this.data.length;
  });

 
  nextIndex = computed(() => {
    if (!this.loop && this.currentIndex() === this.data.length - 1) {
      return this.data.length - 1; // or hide neighbor if not looping
    }
    return (this.currentIndex() + 1) % this.data.length;
  });




  prev(): void {
    if (!this.loop && this.currentIndex() === 0) return;
    this.currentIndex.set(this.prevIndex());
    this.updatePositions();
  }

  next(): void {
    if (!this.loop && this.currentIndex() === this.data.length - 1) return;
    this.currentIndex.set(this.nextIndex());
    this.updatePositions();
  }

  /**
   * Selects a specific index (via radio or any direct click).
   * Determines rotation direction based on whether the new index is
   * greater or less than the current index.
   */
  selectIndex(newIndex: number): void {
    if (newIndex === this.currentIndex()) return;
    this.currentIndex.set(newIndex);
    this.updatePositions();
  }

  /**
   * Clicking on the left neighbor image => prev()
   * Clicking on the right neighbor image => next()
   */
  onNeighborClick(side: 'left' | 'right'): void {
    if (side === 'left') {
      this.prev();
    } else {
      this.next();
    }
  }

  // Helper method to determine media type if not specified
  determineMediaType(item: CarouselItem): MediaType {
    
    const url = item.mediaUrl.toLowerCase();
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/)) return 'image';
    if (url.match(/\.(mp4|webm|ogg)$/)) return 'video';
    if (url.includes('youtube.com') || url.includes('vimeo.com') || url.includes('youtu.be')) return 'iframe';
    return 'unknown';
  }

  handleItemClick(item: CarouselItem): void {
    if (item.redirectUrl) {
      window.open(item.redirectUrl, '_blank');
    }
  }

}
