import { Component, Input, OnInit, Inject, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { MODAL_ANSWER_STREAM } from 'src/app/services/dependency-providers/modalAnswerStream.provider';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() question: string;
  @HostListener('click', ['$event'])
  click() {
    this.streamAnswer(false);
  }

  constructor(
    @Inject(MODAL_ANSWER_STREAM) private modalAnserStream$: Subject<boolean>
  ) {}

  ngOnInit(): void {}

  streamAnswer(answer: boolean, event: Event = null): void {
    event?.stopImmediatePropagation();
    this.modalAnserStream$.next(answer);
  }
}
