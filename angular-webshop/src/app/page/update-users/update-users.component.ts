import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
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
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = (this.activatedRoute.snapshot.params['id'])
    this.userService.getOne(id).subscribe(user => { this.user = user[0] });
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.userService.update(this.user).subscribe(
      user => {
        this.router.navigateByUrl("/users")

      }, err => console.error(err)

    )

  }

}

