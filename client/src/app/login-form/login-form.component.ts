import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  loginForm!: FormGroup;
  submitted = false;
  loading= false;
  error!: String;
  returnUrl!: String;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log("login fail");
      return;
    }
   
    this.userService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(data => {
      console.log("login success", data);
      this.router.navigate([this.returnUrl]);
    },
    error => {
      console.log("login fail",error);
      this.loading = false;
  });
  }
}
