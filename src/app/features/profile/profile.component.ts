import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  profileForm!: FormGroup;
  user: any = null;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getCurrentUser();

    this.profileForm = this.fb.group({
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: [this.user?.password || '', Validators.required]
    });
  }

  save() {
    if (this.profileForm.invalid) return;

    const updatedUser = {
      ...this.user,
      ...this.profileForm.value
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));

    alert('Profile updated successfully');
  }
}
