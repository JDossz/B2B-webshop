import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  newCategory: Category = new Category();
  categoryList: Category[];

  constructor(private ds: DataService, private router: Router) { }

  ngOnInit() {
  }

  onCreate(): void {
    if (this.newCategory.category === undefined) {
      alert('Please write something to every inputbox')
    } else {
      this.ds.createRecord('categories', this.newCategory).subscribe(
        () => this.router.navigate(["/api/categories"])
      )
    }
  }
}
