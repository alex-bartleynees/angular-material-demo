import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { Observable } from 'rxjs';
import { map, startWith  } from 'rxjs/operators/'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'material-demo';
  notifications = 2;
  showSpinner = false;
  selectedValue?:string;
  options: string[] = ["Angular", "React", "Vue"];
  objectOptions = [
    {name: 'Angular'},
    {name: 'Angular Material'},
    {name: 'React'},
    {name: 'Vue'},
  ];

  myControl = new FormControl();
  filteredOptions!: Observable<string[]>

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    )
  }

  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue))
  }

  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }

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
