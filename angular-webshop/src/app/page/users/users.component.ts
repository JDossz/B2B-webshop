import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  list$: BehaviorSubject<any> = this.ds.userList

  constructor(private ds: DataService) { 
      this.ds.readTableByQuery('users', {})}
  
      onDelete(id: number): void {
        this.ds.deleteRecordByQuery('users',{ 'id':id })
      }
  ngOnInit() {
    this.ds.readTableByQuery('users', {});
  }

}