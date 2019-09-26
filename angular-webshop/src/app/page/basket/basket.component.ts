import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Basket } from '../../model/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  list$: Observable<any> = this.ds.readTableByQuery('basket', {});

  constructor(
    private ds: DataService,
    private router: Router) {
    this.ds.readTableByQuery('basket', {})
  }

  onDelete(id: number): void {
    this.ds.deleteRecordByQuery('basket', { 'id': id }).forEach(
      data => console.log(data))
  }

  DeleteAll(id: number): void {
    this.ds.deleteRecordByQuery('basket', { 'userid': id }).forEach(
      data => console.log(data))
  }

  ngOnInit() {
  }

}
