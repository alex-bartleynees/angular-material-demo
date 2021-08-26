import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { Observable } from 'rxjs';
import { map, startWith  } from 'rxjs/operators/'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component';

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
  minDate = new Date();
  maxDate = new Date(2022, 0, 30);

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog ) {}
  

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

  dateFilter = (date:any) => {
    const day = date.getDay();
    return day === 0 && day === 6;
  }

  openSnackBar(message:any, action:any) {
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered');
    });
  }

  openDialog () {
    let dialogRef = this.dialog.open(DialogComponent, {data: {name: 'Vshwas'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }



}
