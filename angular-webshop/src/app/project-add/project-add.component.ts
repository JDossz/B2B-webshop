import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  newProject: Project = new Project();
  projects: BehaviorSubject<any> = this.ds.projectList;

  constructor(private ds: DataService, private router: Router) {
    this.ds.readTableByQuery('projects', {})
  }

  ngOnInit() {
  }

  onCreate() {
    const keys = ['title', 'seo', 'institution', 'shortd', 'longd', 'contact', 'categoryid', 'goal', 'pictureurl', 'link'];
    let error=false;
    keys.forEach((k) => {

      if (!this.newProject[k]) {
        alert(`Please write something to every inputbox. You skipped: ${k} `);
        error = true
        return
      } else if (this.newProject[k] < 0) {
        alert('Please write a positive number, which is not null as your goal.');
        error = true
        return
      } else if (k == 'title') {
        for (let i = 0; i < this.projects.value.length; i++) {
          if (this.projects.value[i].title === this.newProject[k]) {
            alert('This title already exists, please write another one!')
            error = true
            return
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
