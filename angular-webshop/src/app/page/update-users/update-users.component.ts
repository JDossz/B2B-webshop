import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
  user: User;

  constructor(
    private ds: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const userID = (this.activatedRoute.snapshot.params['id'])
    this.ds.readTableByQuery('users', { id: Number.parseInt(userID, 10) })
;
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.ds.updateRecordByQuery('users', { id: this.user.id }, this.user).subscribe(
      user => {
        this.router.navigateByUrl("/users");
        this.user = user;
      }, err => console.error(err)

    )

  }

}

