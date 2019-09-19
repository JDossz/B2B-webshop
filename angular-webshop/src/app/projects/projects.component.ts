import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Observable<any> = this.ps.read();
  constructor(private ps: ProjectService) {
    this.ps.read()
  }
  onDelete(id: number): void {
    this.ps.delete(id).forEach(data => console.log(data))
  }

  ngOnInit() {
  }

}
