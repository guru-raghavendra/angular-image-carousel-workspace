import {
  Component,
  Input,
  signal,
  computed,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'lib-angular-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-image-carousel.component.html',
  styleUrls: ['./angular-image-carousel.component.css'],
})
export class AngularImageCarouselComponent implements OnInit, OnDestroy {
  /**
   * List of image URLs in the carousel.
   */
  @Input() images: string[] = [];

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


  prevIndex = computed(() => {
    if (!this.loop && this.currentIndex() === 0) {
      return 0; // or hide neighbor if not looping
    }
    return (this.currentIndex() - 1 + this.images.length) % this.images.length;
  });

  /**
   * Compute the next index with wrapping (if loop is true).
   */
  nextIndex = computed(() => {
    if (!this.loop && this.currentIndex() === this.images.length - 1) {
      return this.images.length - 1; // or hide neighbor if not looping
    }
    return (this.currentIndex() + 1) % this.images.length;
  });

  // Track positions of all images
  positions = signal<('far-left' | 'left' | 'center' | 'right' | 'far-right' | 'hidden')[]>([]);

  ngOnInit(): void {
    this.updatePositions();
  }

  private updatePositions(): void {
    const current = this.currentIndex();
    const newPositions = this.images.map((_, index) => {
        if (index === current) return 'center';
        if (index === this.prevIndex()) return 'left';
        if (index === this.nextIndex()) return 'right';
        if (index < this.prevIndex()) return 'far-left';
        if (index > this.nextIndex()) return 'far-right';
        return 'hidden';
    });
    this.positions.set(newPositions);
  }

  ngOnDestroy(): void {
    // Clean up any intervals/subscriptions if added
  }

  /**
   * Moves to the previous image, rotating clockwise (per requirements).
   */
  prev(): void {
    if (!this.loop && this.currentIndex() === 0) return;
    this.currentIndex.set(this.prevIndex());
    this.updatePositions();
  }

  /**
   * Moves to the next image, rotating anticlockwise (per requirements).
   */
  next(): void {
    if (!this.loop && this.currentIndex() === this.images.length - 1) return;
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

}
