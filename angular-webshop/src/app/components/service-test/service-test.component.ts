import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css']
})
export class ServiceTestComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
  }

  onCreate() {
    this.dataService.createRecord('users', {
      admin: 0,
      name: "tesztes károj",
      email: "tesztes.karoj@gmail.com",
      password: "tesztasdasdasd",
      balance: 12345,
      address: "itten e",
      picture: '',
    }).subscribe();
  }

  onDelete() {
    this.dataService.deleteRecordByQuery('users', {
      id: 103
    }).subscribe();
  }

  onUpdate() {
    this.dataService.updateRecordByQuery('users', {
      id: 1
    }, {
      email: "tesztes.karoj.modositva@gmail.com",
    }).subscribe();
  }

}
