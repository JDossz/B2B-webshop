import { Component, OnInit } from '@angular/core';
import { DbTestService } from 'src/app/services/db-test.service';

@Component({
  selector: 'app-db-test',
  templateUrl: './db-test.component.html',
  styleUrls: ['./db-test.component.css']
})
export class DbTestComponent implements OnInit {

  constructor(
    private testService: DbTestService
  ) { }

  ngOnInit() {
  }

  testClick(id) {
    this.testService.testDelete(id);
  }

}
