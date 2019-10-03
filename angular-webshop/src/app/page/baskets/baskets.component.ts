import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Basket } from '../../model/basket';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {

  list$: BehaviorSubject<any> = this.ds.basketList

  constructor(
    private ds: DataService,
    private router: Router) {
    this.ds.readTableByQuery('baskets', {})
  }

  // törlés egyedi projekt id alapján
  onDelete(id: number): void {
    this.ds.deleteRecordByQuery('baskets', { 'id': id })
  }
  // azonos user-hez tartozó projekteket töröl
  DeleteAll(id: number): void {
    this.ds.deleteRecordByQuery('baskets', { 'userid': id })
  }

  ngOnInit() {
    this.ds.readTableByQuery('baskets', {});
  }

}
