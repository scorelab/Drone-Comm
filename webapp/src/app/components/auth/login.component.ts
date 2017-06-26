import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {JwtService} from "../../services/jwt.service";
/**
 * @author Amila Karunathilaka
 */
@Component({
  selector: 'drone-comm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user: User = new User();
  loginError: string = null;
  submitted: boolean = false;
  returnUrl: string;
  message: string;

  constructor(private route: ActivatedRoute, public authService: AuthService, private router: Router) {
    this.message = '';
  }

  login() {
    console.error('Amila');
    this.submitted = true;
    this.dismissError();
    this.authService.login(this.user).subscribe(
      data => {
        console.debug(data.headers + " " + data.json());
        if (data.headers.has("Authorization") || data.json().token) {
          JwtService.saveUserName(this.user.name);
          var token = data.headers.get("Authorization") || data.json().token;
          JwtService.saveToken(token);
          this.navigateToDashboard();
        } else {
          this.submitted = false;
          console.error("Authentication header is missing");
          this.loginError = "Authentication header is missing";
        }
      },
      error => {
        this.submitted = false;
        this.loginError = error.json().message;
      }
    );
  }

  ngOnInit(): void {
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private navigateToDashboard() {
    this.router.navigate([this.returnUrl]);
    console.error('Amila');
  }

  dismissError() {
    this.loginError = '';
  }

}
