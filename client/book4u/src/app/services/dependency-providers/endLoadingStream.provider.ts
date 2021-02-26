import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const END_LOADING_STREAM = new InjectionToken(
  'Stream which signals about network load ending'
);

function endLoadingStreamFactory(): Subject<void> {
  return new Subject<void>();
}

export const endLoadingStreamProvider = {
  provide: END_LOADING_STREAM,
  useFactory: endLoadingStreamFactory,
};
