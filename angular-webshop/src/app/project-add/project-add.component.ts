import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  newProject: Project = new Project();
  projectList: Project[];

  constructor(private ds: DataService, private router: Router) { }

  ngOnInit() {
  }

  onCreate(): void {
    if (this.newProject.title === undefined || this.newProject.seo === undefined || this.newProject.institution === undefined || this.newProject.shortd === undefined || this.newProject.longd === undefined || this.newProject.contact === undefined || this.newProject.category === undefined || this.newProject.donation === undefined || this.newProject.goal === undefined || this.newProject.balance ===undefined|| this.newProject.pictureurl===undefined||this.newProject.link===undefined) {
      alert('Please write something to every inputbox')
    } else {
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
