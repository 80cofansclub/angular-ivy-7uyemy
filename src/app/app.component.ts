import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'testDep';

  fileList!: FileList;
  file: string | ArrayBuffer;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('init');
    // this.readFile();
  }

  test() {
    var blob = new Blob(['Hello, world!'], {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(blob, 'hello world.txt');
  }
  selectFile(ev: Event) {
    console.log(ev);

    this.fileList = (<HTMLInputElement>ev.target).files!;
    const f = this.fileList.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(f!);
    reader.onload = () => {
      console.log(reader.result);
    };
  }

  downloadFile() {
    const f = this.fileList.item(0);
    const reader = new FileReader();
    const blob = new Blob([f!], { type: 'application/pdf' });
    FileSaver.saveAs(blob, 'test.pdf');
  }
}
