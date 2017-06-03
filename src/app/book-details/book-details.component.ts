import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentService, Comment} from '../shared/service/comment/comment.service';
import {Book} from '../shared/book';

@Component({
  selector: 'bs-root',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book: Book = {
    title: 'Essential Angular',
    description: 'The book is a short, but at the same time, fairly complete overview of the key aspects of Angular ' +
    'written by its core contributors Victor Savkin and Jeff Cross, who are founders of Nrwl - Angular Consulting ' +
    'for enterprise customers, from core contributors.',
    coverUrl: 'assets/books/essential_angular.jpg'
  };

  comments: Array<Comment> = [];
  form: FormGroup;
  isLoading = false;
  maxNote = 10;

  constructor(
      private commentService: CommentService,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      text: ['', Validators.required],
      note: [5, Validators.required]
    });
  }

  send() {
    this.isLoading = true;
    this.commentService
        .save(this.form.value)
        .subscribe(
            c => this.comments.push(c),
            () => this.isLoading = false,
            () => {
              this.isLoading = false;
              this.form.reset({login: '', text: '', note: 5});
            }
        );
  }
}
