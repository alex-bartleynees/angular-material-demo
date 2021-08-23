import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'material-demo';
  notifications = 2;
  showSpinner = false;

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

  opened: boolean = false;

  log(state: any) {
    console.log(state);
  }

  logChange(index: any) {
    console.log(index)
  }
}
