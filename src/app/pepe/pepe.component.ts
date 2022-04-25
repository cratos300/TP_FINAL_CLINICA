import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-pepe',
  templateUrl: './pepe.component.html',
  styleUrls: ['./pepe.component.css']
})
export class PepeComponent implements OnInit {

  unpaciente:Paciente;
  aceptado:boolean = false;
  public formGroup!: FormGroup;
  constructor(private fb:FormBuilder) 
  {
    this.unpaciente = new Paciente();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'nombre': ['',[Validators.compose([Validators.required])]],
      
    });
  }
  aceptar()
  {
    this.aceptado = true;
  }

}
