import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  user$: BehaviorSubject<User> = this.ds.user;
  user: User;
  missingData;

  constructor(
    private ds: DataService,
    private ar: ActivatedRoute,
    private router: Router
  ) {
    this.ar.params.forEach(params => {
      this.ds.readTableByQuery('users', {
        id: params.id,
      });
    });
    this.user$.subscribe(
      data => {
        this.user = data;
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    const keys = ['firstname', 'lastname', 'emailaddress'];
    let error = false;
    let missing = [];
    keys.forEach((k) => {
      if (!this.user[k]) {
        missing.push(k);
        this.missingData = 'You skipped: ';
        this.missingData += missing;
        error = true;
      }
    })
    if (!error) {
      delete this.user.token; // IMPORTANT!
      this.ds.updateRecordByQuery('users', { id: this.user.id }, this.user).subscribe(
        () => this.router.navigateByUrl("/users"))
    }
  }
}