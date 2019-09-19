import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectService } from '../service/project.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  project: Project = new Project();

  ngOnInit() {
  }
  constructor(private ps: ProjectService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      this.ps.readOne(params.id).subscribe(
        project => this.project = project
      )
    });
  }

  onUpdate() {
    if (this.project.seo === ''||this.project.contact===''||this.project.link===''||this.project.category===''||this.project.shortd===''||this.project.longd===''||this.project.picture===''||this.project.institution==='') {
      alert('pls write something')
    } else {
      this.ps.update(this.project).subscribe(
        () => this.router.navigate(["/projects"])
      )
    }
  }
}
