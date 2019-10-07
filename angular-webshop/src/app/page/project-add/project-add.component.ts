import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/model/project';
import { DataService } from 'src/app/services/data.service';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  newProject: Project = new Project();
  projects: BehaviorSubject<any> = this.ds.projectList;
  categories: BehaviorSubject<Category> = this.ds.categoryList;
  wrongAmmount: boolean = false;
  wrongTitle: boolean = false;
  missingData;


  constructor(private ds: DataService, private router: Router) {
    this.ds.readTableByQuery('projects', {})
    this.ds.readTableByQuery('categories', {})
  }

  ngOnInit() {
  }

  onCreate() {
    const keys = ['title', 'seo', 'institution', 'shortd', 'longd', 'contact', 'categoryid', 'goal', 'pictureurl', 'link'];
    let error = false;
    let missing = [];
    keys.forEach((k) => {

      if (!this.newProject[k]) {
        missing.push(k)
        this.missingData = 'You skipped: '
        this.missingData += missing
        error = true
      } else if (this.newProject[k] < 0) {
        this.wrongAmmount = true;
        error = true
      } else if (k == 'title') {
        for (let i = 0; i < this.projects.value.length; i++) {
          if (this.projects.value[i].title === this.newProject[k]) {
            this.wrongTitle = true;
            error = true
          }
        }
      }
    })
    if (!error) {
      this.ds.createRecord('projects', this.newProject).subscribe(
        () => this.router.navigate(["/api/projects"])
      )
    }
  }

  onKey(event: any) {
    this.newProject.seo = event.target.value.toString()               // Convert to string
      .normalize('NFD')               // Change diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
      .replace(/\s+/g, '-')            // Change whitespace to dashes
      .toLowerCase()                  // Change to lowercase
      .replace(/&/g, '-and-')          // Replace ampersand
      .replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
      .replace(/-+/g, '-')             // Remove duplicate dashes
      .replace(/^-*/, '')              // Remove starting dashes
      .replace(/-*$/, '');             // Remove trailing dashes
  }
}
