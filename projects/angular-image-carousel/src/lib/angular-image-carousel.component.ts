import {
  Component,
  Input,
  signal,
  computed,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import {
//   trigger,
//   state,
//   style,
//   transition,
//   animate,
//   AnimationEvent
// } from '@angular/animations';

@Component({
  selector: 'lib-angular-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-image-carousel.component.html',
  styleUrls: ['./angular-image-carousel.component.css'],
//   animations: [
//     trigger('rotateAnimation', [
//       // State for no rotation
//       state('none', style({ transform: 'none' })),

//       // State for clockwise rotation
//       state('clockwise', style({ transform: 'rotate(360deg)' })),

//       // State for anticlockwise rotation
//       state('anticlockwise', style({ transform: 'rotate(-360deg)' })),

//       // Any -> clockwise
//       transition('* => clockwise', [
//         animate('0.5s')
//       ]),
//       // Any -> anticlockwise
//       transition('* => anticlockwise', [
//         animate('0.5s')
//       ]),
//       // Return to none
//       transition('* => none', [
//         animate('0s')
//       ])
//     ])
//   ]
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
  @Input() mainWidth = 200;
  @Input() mainHeight = 200;

  /**
   * Width and height for the neighbor (prev/next) images.
   */
  @Input() neighborWidth = 150;
  @Input() neighborHeight = 150;

  /**
   * Blur intensity for the neighbor images.
   */
  @Input() blurIntensity = 2;

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

  /**
   * Rotation direction used for the animation.
   * Possible values: 'none' | 'clockwise' | 'anticlockwise'
   */
//   rotationState = signal<'none' | 'clockwise' | 'anticlockwise'>('none');

  /**
   * Compute the previous index with wrapping (if loop is true).
   */
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

  ngOnInit(): void {
    // Optional: set up auto-play or other logic here
  }

  ngOnDestroy(): void {
    // Clean up any intervals/subscriptions if added
  }

  /**
   * Moves to the previous image, rotating clockwise (per requirements).
   */
  prev(): void {
    if (!this.loop && this.currentIndex() === 0) return;

    // Set rotation state to clockwise
    // this.rotationState.set('clockwise');
    // Move index
    this.currentIndex.set(this.prevIndex());
  }

  /**
   * Moves to the next image, rotating anticlockwise (per requirements).
   */
  next(): void {
    if (!this.loop && this.currentIndex() === this.images.length - 1) return;

    // Set rotation state to anticlockwise
    // this.rotationState.set('anticlockwise');
    // Move index
    this.currentIndex.set(this.nextIndex());
  }

  /**
   * Selects a specific index (via radio or any direct click).
   * Determines rotation direction based on whether the new index is
   * greater or less than the current index.
   */
  selectIndex(newIndex: number): void {
    if (newIndex === this.currentIndex()) return;

    // Decide direction:
    // If new index is greater than current => anticlockwise
    // Else => clockwise
    if (newIndex > this.currentIndex()) {
    //   this.rotationState.set('anticlockwise');
    } else {
    //   this.rotationState.set('clockwise');
    }
    this.currentIndex.set(newIndex);
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

  /**
   * Return inline CSS for neighbor blur effect
   */
//   getBlurStyle(): string {
//     return `blur(${this.blurIntensity}px)`;
//   }

  /**
   * After animation ends, reset to 'none'
   */
//   onAnimationDone(event: AnimationEvent) {
//     // this.rotationState.set('none');
//   }
}
