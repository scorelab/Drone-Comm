import {Component, OnInit, ViewChild} from "@angular/core";
import {Profile} from "../../models/profile.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {RegisterVerificationComponent} from "./resendverification/register.verification.component";
import {serializePaths} from "@angular/router/src/url_tree";
/**
 * @author Amila Karunathilaka
 */

@Component({
  selector: 'drone-comm-register',
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit{

  profile: Profile = new Profile();
  user: User = new User();

  returnUrl: string;
  submitted: boolean = false;

  @ViewChild("resendVerifyEmailModal")
  resendVerifyEmailModal: RegisterVerificationComponent;


  constructor(private userService: UserService, private router: Router, private toastr: ToastsManager){
    this.returnUrl = 'login';
  }

  ngOnInit(): void {
  }

  register(){
    this.profile.user = this.user;
    if(!this.submitted) {
      this.submitted = true;
      this.userService.registerUser(this.profile).subscribe(
        data => {
          this.toastr.success(data.json().msg, " Successfully Registered");
          this.showEmailResenderModal();
        }, error => {
          this.toastr.error(error.json().msg, "Registration Failed");
        });
    }
  }

  showEmailResenderModal(){
    this.resendVerifyEmailModal.confirmModalContent = 'If you not received verification email. Resend again';
    this.resendVerifyEmailModal.showModal();
  }

  navigate() {
    this.resendVerifyEmailModal.hideModal();
    this.router.navigate([this.returnUrl]);
  }

}
