import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../service/project.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Observable<any> = this.ds.readTableByQuery('projects', {});
  constructor(private ds: DataService) {
    this.ds.readTableByQuery('projects', {})
  }
  onDelete(id: number): void {
    this.ds.deleteRecordByQuery('projects',{ 'id':id }).forEach(data => console.log(data))
  }

  ngOnInit() {
  }

}
