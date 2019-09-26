import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Basket } from '../../model/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  list$: BehaviorSubject<any> = this.ds.basketList

  constructor(
    private ds: DataService,
    private router: Router) {
    this.ds.readTableByQuery('basket', {})
  }

  // törlés egyedi projekt id alapján
  onDelete(id: number): void {
    this.ds.deleteRecordByQuery('basket', { 'id': id })
  }
  // azonos user-hez tartozó projekteket töröl
  DeleteAll(id: number): void {
    this.ds.deleteRecordByQuery('basket', { 'userid': id })
  }

  ngOnInit() {
    this.ds.readTableByQuery('basket', {});
  }

}
