import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Category } from '../model/category';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: BehaviorSubject<any> = this.ds.projectList;
  categories: BehaviorSubject<Category> = this.ds.categoryList;

  constructor(private ds: DataService) {
    this.ds.readTableByQuery('projects', {
      'isactive': 1,
      from: 'INNER JOIN categories ON categories.id=projects.categoryid',
      select: 'projects.id,projects.title,projects.seo,projects.institution,projects.shortd,projects.longd,projects.contact,projects.donation,projects.goal,projects.balance,projects.pictureurl,projects.link,categories.category as category'
    })
  }
  onDelete(seo: string): void {
    this.ds.updateRecordByQuery('projects', { 'seo': seo }, { 'isactive': 0 }).subscribe(
      () => this.ds.readTableByQuery('projects', { 'isactive': 1 })
    )
  }

  ngOnInit() { }
  readAll() {
    this.ds.readTableByQuery('projects', {})
  }

  readActive() {
    this.ds.readTableByQuery('projects', { 'isactive': 1 });

  }
}
