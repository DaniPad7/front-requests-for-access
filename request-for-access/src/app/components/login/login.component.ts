import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authService: AuthenticationServiceService) {
      console.log('Reached login constructor');
      if(localStorage.getItem('access_token'))
        this.router.navigate(['/']);
     }

  ngOnInit(): void {
    console.log('Reached login onInit');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid)/**temporary */
      return;

    this.loading = true;
    let group = this.loginForm.controls;
    this.authService.login(group.username.value, group.password.value)
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        }, error: err => {
          console.log(err);
          this.error = err;
          this.loading = false;
        }
      });
  }

}
