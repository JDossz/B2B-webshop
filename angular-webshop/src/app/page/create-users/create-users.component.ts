import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  user: User = new User();


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onSubmit(ev: Event): void {
    ev.preventDefault();
    this.userService.create(this.user).subscribe(
      user => {

        this.router.navigateByUrl("/users")

      }, err => console.error(err)

    )

  }
}