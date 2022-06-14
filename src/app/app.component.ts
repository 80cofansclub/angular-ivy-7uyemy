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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.readFile();
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

  readFile() {
    this.http
      .get(
        `file:///C:/Users/shannon_lin/Downloads/The-new-T-Roc-Presale-Flyer.pdf`,
        { responseType: 'blob' }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  downloadFile() {
    const f = this.fileList.item(0);
    const reader = new FileReader();
    const blob = new Blob([f!], { type: 'application/pdf' });
    FileSaver.saveAs(blob, 'test.pdf');
  }
}
