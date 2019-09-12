import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {PlatformsService} from './platforms.service';



@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent implements OnInit {
  deleteModal = false;
  updateModal = false;
  insertModal = false;
  filter: string;
  platformsList: any;
  form: FormGroup;
  pid: number;
  updateForm: FormGroup;


  constructor(private platformsService: PlatformsService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.platformsService.getAllPlatforms().subscribe((data: any) => {
      this.platformsList = data;
      console.log(this.platformsList);
    });


    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      comment: [''],
      version: [''],
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      updateDateTime: [],
      deletedDateTime: [],
      comment: [''],
      version: [],
    });

    console.log(this.updateForm);

  }



  onSubmit() {
    const values = this.form.value;
    console.log('on Submit', values);
    this.platformsService.registerPlatforms(values).subscribe(
      get => {
        this.platformsService.getAllPlatforms().subscribe((data: any) => {
          this.platformsList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    this.insertModal = false;

  }


  onDelete() {
    this.platformsService.deletePlatform(this.pid).subscribe(
      get => {
        this.platformsService.getAllPlatforms().subscribe((data: any) => {
          this.platformsList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.toggleModal();

  }

  onUpdate() {
    const values = this.updateForm.value;
    console.log(values);
    this.platformsService.updatePlatform(values, this.pid).subscribe(
      get => {
        this.platformsService.getAllPlatforms().subscribe((data: any) => {
          this.platformsList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.updateModal = false;
  }

  openInsert() {
    console.log('insert is called');
    this.insertModal = true;
    console.log('from open insert', this.insertModal);
  }

  openUpdate(
    id,
    name,
    recordStatus,
    updateDateTime,
    deletedDateTime,
    comment,
    version: number) {
    this.pid = id;
    this.updateModal = true;
    this.updateForm.controls.name.setValue(name);
    this.updateForm.controls.recordStatus.setValue(recordStatus);
    this.updateForm.controls.updateDateTime.setValue(updateDateTime);
    this.updateForm.controls.deletedDateTime.setValue(deletedDateTime);
    this.updateForm.controls.comment.setValue(comment);
    this.updateForm.controls.version.setValue(version);

  }

  closeUpdateModal() {
    this.updateModal = !this.updateModal;
    this.form.reset();
    this.updateForm.reset();
  }

  closeInsertModal() {
    this.insertModal = !this.insertModal;
    this.form.reset();
    this.updateForm.reset();
  }

  toggleModal() {
    this.deleteModal = !this.deleteModal;
    this.form.reset();
    this.updateForm.reset();
  }

  openDelete(pid) {
    this.deleteModal = true;
    this.pid = pid;
    console.log(this.pid);
  }


}
