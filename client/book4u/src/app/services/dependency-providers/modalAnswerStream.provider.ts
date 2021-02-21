import { Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const MODAL_ANSWER_STREAM = new InjectionToken(
  'A stream with users interaction answers'
);

function modalAnswerStreamFactory(): Subject<boolean> {
  return new Subject<boolean>();
}

export const modalAnswerStreamProvider = {
  provide: MODAL_ANSWER_STREAM,
  useFactory: modalAnswerStreamFactory,
};
