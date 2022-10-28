import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ICourse } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses$: Observable<ICourse[]>;
  public displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.findAllCourses().pipe(
      catchError(() => {
        this.onError('Erro ao carregar os cursos!');
        return of([]);
      })
    );
  }

  public ngOnInit(): void {}

  public onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  public onAddCourse() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
