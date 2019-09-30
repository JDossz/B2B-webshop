import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProjectService } from '../service/project.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: BehaviorSubject<any> = this.ds.projectList;
  constructor(private ds: DataService,private router:Router) {
    this.ds.readTableByQuery('projects', {})
  }
  onDelete(seo:string): void {
    this.ds.updateRecordByQuery('projects', { 'seo': seo }, { 'isactive': 0 }).subscribe(
      () => this.ds.readTableByQuery('projects', {})
    )
  }

  ngOnInit() {
    this.ds.readTableByQuery('projects', {});
  }

}
