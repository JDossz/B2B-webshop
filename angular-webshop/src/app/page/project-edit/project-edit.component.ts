import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../model/category';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  project$: BehaviorSubject<Project> = this.ds.project;
  project: Project;
  categories: BehaviorSubject<Category> = this.ds.categoryList;
  wrongAmmount: boolean = false;
  missingData;

  ngOnInit() {
  }

  constructor(private ds: DataService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      this.ds.readTableByQuery('projects', {
        seo: params.seo,
      });
    });
    this.project$.subscribe(
      data => {
        this.project = data[0];
      }
    );
    this.ds.readTableByQuery('categories', {})
  }

  onUpdate() {
    const keys = ['title', 'seo', 'institution', 'shortd', 'longd', 'contact', 'categoryid', 'goal', 'pictureurl', 'link'];
    let error = false;
    let missing = [];
    keys.forEach((k) => {

      if (!this.project[k]) {
        missing.push(k)
        this.missingData = 'You skipped: '
        this.missingData += missing
        error = true
      } else if (this.project[k] < 0) {
        this.wrongAmmount = true;
        error = true
      }
    })
    if (!error) {
      this.project.lastfunded =this.project.lastfunded|| 0;
      this.ds.updateRecordByQuery('projects', { 'seo': this.project.seo }, this.project).subscribe(
        () => this.router.navigate(["/api/projects"])
      )
    }

  }
}
