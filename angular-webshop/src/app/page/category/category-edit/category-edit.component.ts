import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category$: BehaviorSubject<Category> = this.ds.category;
  category: Category;
  missingData;

  ngOnInit() {
  }

  constructor(private ds: DataService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      this.ds.readTableByQuery('categories', {
        id: params.id,
      });
    });
    this.category$.subscribe(
      data => {
        this.category = data;
      }
    )
  }

  onUpdate() {
    if (this.category.category === '') {
      this.missingData = 'Please write a category name!'
    } else {
      this.ds.updateRecordByQuery('categories', { 'id': this.category.id }, this.category).subscribe(
        () => this.router.navigate(["/api/categories"])
      )
    }
  }
}
