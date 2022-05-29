import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { slideInAnimation } from '../assets/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(private ToastrSvc:ToastrService,private spinner: NgxSpinnerService)
  {
    this.spinner.show();
  }
  title = 'tpfinal';
  llego(boleano:boolean)
  {
    this.spinner.hide();
  }
 
}
