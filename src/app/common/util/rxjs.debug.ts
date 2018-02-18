
import { Observable } from 'rxjs/Observable';

Observable.prototype.debug = function(message: string) {
  return this.do(
    function(next) {
      if (!IS_PRODUCTION) {
        console.log(message, next);
      }
    },
    function(err) {
      if (!IS_PRODUCTION) {
        console.error('ERROR >>> ', message, err);
      }
    },
    function() {
      if (!IS_PRODUCTION) {
        console.log('COMPLETED >>> ', message);
      }
    }
  );
};

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}
