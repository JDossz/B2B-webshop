import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  newProject: Project = new Project();
  projectList: Project[];
  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  onCreate(): void {
    if (this.newProject.title === undefined || this.newProject.seo === undefined || this.newProject.contact === undefined || this.newProject.link === undefined || this.newProject.category === undefined || this.newProject.shortd === undefined || this.newProject.longd === undefined || this.newProject.picture === undefined || this.newProject.institution === undefined) {
      alert('pls write something')
    } else {
      this.ds.createRecord('projects', this.newProject).subscribe(
        () => console.log(this.newProject)
      )
    }
  }
}
