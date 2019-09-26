import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProjectService } from '../service/project.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: BehaviorSubject<any> = this.ds.projectList;
  constructor(private ds: DataService) {
    this.ds.readTableByQuery('projects', {})
  }
  onDelete(id: number): void {
    this.ds.deleteRecordByQuery('projects', { 'id': id })
  }

  ngOnInit() {
    this.ds.readTableByQuery('projects', {});
  }

}
