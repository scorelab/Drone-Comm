import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
/**
 * @author Amila Karunathilaka
 */

@Component({
  selector: 'drone-comm-email-verify',
  templateUrl: "./verify.component.html"
})
export class VerifyComponent implements OnInit {

  returnUrl: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
              private toastr: ToastsManager) {
    this.returnUrl = "login";
    this.verify();
  }

  ngOnInit(): void {
  }

  verify() {
    let param;
    this.route.queryParams.subscribe(params => {
      param = params['id'];
      this.userService.verifyUser(params['id']).subscribe(
        data => {
          this.toastr.success(data.json().msg, " Successfully Verified Email");
        },
        error => {
          console.log('error', error);
          this.toastr.error(error.json().msg, "Email Verification Failed");
        });
    });
    console.log('example', param)
  }


}
