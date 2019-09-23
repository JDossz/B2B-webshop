import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectService } from '../service/project.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  project: any;

  ngOnInit() {
  }
  constructor(private ds: DataService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      this.ds.readTableBySeoName('projects', params.seo).subscribe(
        project => this.project = project
      )
    });
  }

  onUpdate() {

    if (this.project.seo === '' || this.project.contact === '' || this.project.link === '' || this.project.category === '' || this.project.shortd === '' || this.project.longd === '' || this.project.picture === '' || this.project.institution === '') {
      alert('pls write something')
    } else {
      this.ds.updateRecordByQuery('projects', { 'seo': this.project.seo }, this.project).subscribe(
        () => this.router.navigate(["/api/projects"])
      )
    }
  }
}
