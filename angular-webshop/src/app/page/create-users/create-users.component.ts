import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  user: User = new User();


  constructor(
    private ds: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.ds.createRecord('users', this.user).subscribe(
      () => {

        this.router.navigateByUrl('/users')

      }, err => console.error(err)

    )

  }
}
