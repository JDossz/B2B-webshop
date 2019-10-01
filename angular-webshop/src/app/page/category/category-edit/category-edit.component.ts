import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: Category;

  ngOnInit() {
  }
  constructor(private ds: DataService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      console.log(params.id)
      this.ds.readTableById('categories', params.id).subscribe(
        category => { this.category = category[0]; console.log(category); }
      )
    });
  }

  onUpdate() {
    this.ds.updateRecordByQuery('categories', { 'id': this.category.id }, this.category).subscribe(
      () => this.router.navigate(["/api/categories"])
    )
  }
}
