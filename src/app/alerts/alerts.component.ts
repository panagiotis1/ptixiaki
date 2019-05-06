import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicatorService } from '../communicator.service';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  errorMsg=null;
  successMsg=null;
  warningMsg=null;

  constructor(private _communicator: CommunicatorService) {
  	this.subscription = _communicator.communicatorAlert$.subscribe(
      communicator => {
      	this.errorMsg = communicator.error;
        this.successMsg = communicator.success;
        this.warningMsg = communicator.warning;
    });}

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
