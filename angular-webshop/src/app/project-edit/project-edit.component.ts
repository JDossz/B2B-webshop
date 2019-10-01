import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  project$: BehaviorSubject<Project> = this.ds.project;
  project: Project;

  ngOnInit() {
  }

  constructor(private ds: DataService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      this.ds.readTableByQuery('projects', {
        seo: params.seo,
      });
    });
    this.project$.subscribe(
      data => {
        this.project = data[0];
      }
    );
  }

  onUpdate() {
    if (this.project.title === '' || this.project.seo === '' || this.project.institution === '' || this.project.shortd === '' || this.project.longd === '' || this.project.contact === '' || this.project.categoryid === '' || this.project.donation === 0 || this.project.goal === 0 || this.project.balance === 0 || this.project.pictureurl === '' || this.project.link === '') {
      alert('Please write something to every inputbox')
    } else if (this.project.goal == 0 || this.project.donation == 0 || this.project.balance == 0 || this.project.goal < 0 || this.project.donation < 0 || this.project.balance < 0 || !Number.isInteger(this.project.goal)|| !Number.isInteger(this.project.donation)|| !Number.isInteger(this.project.balance)) {
      alert('Please write a positive even number, which is not null!')
    } else if (typeof this.project.goal !== 'number' || typeof this.project.donation !== 'number' || typeof this.project.donation !== 'number' ) {
      alert('Please write a number!')
    }else {
    this.ds.updateRecordByQuery('projects', { 'seo': this.project.seo }, this.project).subscribe(
      () => this.router.navigate(["/api/projects"])
    )
    }
  }
  onKey(event: any) {
    this.project.seo = event.target.value.toString()               // Convert to string
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
