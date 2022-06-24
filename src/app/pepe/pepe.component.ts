import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Paciente } from 'src/app/clases/paciente';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pepe',
  templateUrl: './pepe.component.html',
  styleUrls: ['./pepe.component.css']
})
export class PepeComponent implements OnInit {

  unpaciente:Paciente;
  aceptado:boolean = false;
  public formGroup!: FormGroup;
  ctx:any
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
  ngAfterViewInit()
  {
     this.ctx = document.getElementById('myChart');
const myChart = new Chart(this.ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# Logs ingresos al sistema',
            data: [12, 6, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
    // let ctx: any = document.getElementById("myChart") as HTMLElement;
    // var data = {
    //   labels: ["match1", "match2", "match3", "match4", "match5"],
    //   datasets: [
    //     {
    //       label: "TeamA Score",
    //       data: [10, 50, 25, 70, 40],
    //       backgroundColor: "blue",
    //       borderColor: "lightblue",
    //       fill: false,
    //       lineTension: 0,
    //       radius: 5
    //     },
    //     {
    //       label: "TeamB Score",
    //       data: [20, 35, 40, 60, 50],
    //       backgroundColor: "green",
    //       borderColor: "lightgreen",
    //       fill: false,
    //       lineTension: 0,
    //       radius: 5
    //     }
    //   ]
    // };
  
    // //options
    // var options = {
    //   responsive: true,
    //   title: {
    //     display: true,
    //     position: "top",
    //     text: "Line Graph",
    //     fontSize: 18,
    //     fontColor: "#111"
    //   },
    //   legend: {
    //     display: true,
    //     position: "bottom",
    //     labels: {
    //       fontColor: "#333",
    //       fontSize: 16
    //     }
    //   }
    // };
  
    // //create Chart class object
    // var chart = new Chart(ctx, {
    //   type: "line",
    //   data: data,
    //   options: options
    // });
  }

}
