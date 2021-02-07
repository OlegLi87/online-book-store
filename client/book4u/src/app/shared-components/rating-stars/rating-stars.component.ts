import { AfterViewInit, ElementRef } from '@angular/core';
import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.sass'],
})
export class RatingStarsComponent implements OnInit, AfterViewInit {
  @Input() stars: number = 10;
  @Input() rating: number = 5;
  @Input() color: string = 'red';
  @Input() size: { width: string; height: string } = {
    width: '1.25rem',
    height: '1.25rem',
  };
  @Input() readable: boolean = false;
  @ViewChild('container') containerRef: ElementRef<HTMLDivElement>;

  colorsArray = new Array<string>();
  private starsArray: Array<SVGSVGElement>;

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.stars; i++) {
      let color = i < this.rating ? this.color : '';
      this.colorsArray.push(color);
    }
  }

  ngAfterViewInit(): void {
    this.setStarsArray();
  }

  setInitialColors(): void {
    if (this.readable) return;
    this.setColors(this.rating - 1);
  }

  hovered(event: Event): void {
    if (this.readable) return;
    const starIndex = this.getStarIndex(event.target as SVGAElement);
    this.setColors(starIndex);
  }

  changeRating(event: Event): void {
    if (this.readable) return;
    let targetEl = event.target as Element;
    if (!(targetEl instanceof SVGSVGElement)) targetEl = targetEl.parentElement; // click might be on path element
    this.rating = this.getStarIndex(targetEl as SVGSVGElement) + 1;
    this.setColors(this.rating - 1);
    this.readable = true;
  }

  private setColors(starIndex: number): void {
    this.starsArray.forEach((s, i) => {
      if (starIndex >= i) s.style.fill = this.color;
      else s.style.fill = '';
    });
  }

  private getStarIndex(star: SVGElement): number {
    return this.starsArray.findIndex((s) => s === star);
  }

  private setStarsArray(): void {
    this.starsArray = Array.from(
      this.containerRef.nativeElement.getElementsByTagName('svg')
    );
  }
}
