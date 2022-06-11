import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-elegir-especialista',
  templateUrl: './elegir-especialista.component.html',
  styleUrls: ['./elegir-especialista.component.css']
})
export class ElegirEspecialistaComponent implements OnInit {
   @Input() usuarios:any;
  constructor() 
  {
    
  }

  ngOnInit(): void {
  }

}
