import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  list$: Observable<any> = this.userService.read();
  

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    userService.access()
  }


  ngOnInit() {

  }

  onDelete(id: number): void {
    this.userService.delete(id).forEach(data => console.log(data))
  }

}