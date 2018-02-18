import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class BaseComponent implements OnDestroy {

  private subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];
  }

  public registerSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  public ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
