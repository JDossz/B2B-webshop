import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: BehaviorSubject<any> = this.ds.categoryList;
  constructor(private ds: DataService) {
    this.ds.readTableByQuery('categories', {})
  }
  onDelete(id: number): void {
    this.ds.deleteRecordByQuery('categories', { 'id': id })
    
  }

  ngOnInit() {
    this.ds.readTableByQuery('categories', {});
  }

}
