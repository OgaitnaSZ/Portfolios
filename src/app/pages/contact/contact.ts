import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;
  messageFormStatus: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  // Contact form submission
  onSubmit(): void {
    if (this.contactForm.invalid || this.isSubmitting) {
      return;
    }
  
    this.isSubmitting = true;
    this.messageFormStatus = '';
  
    const { name, email, message } = this.contactForm.value;
  
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('message', message);
  
    this.http
      .post(
        'https://script.google.com/macros/s/AKfycbw9Nu6COOjdlZc4ZLG4xMfdD_5rlKaHzJNZGsdIe23jkN785IyziSeheLHqaIV775_UOw/exec',
        data,
        { responseType: 'text' }
      )
      .subscribe({
        next: () => {
        },
        error: () => {
        },
      });
      this.messageFormStatus = 'success';
      this.contactForm.reset();
      this.isSubmitting = false;
  }
}
