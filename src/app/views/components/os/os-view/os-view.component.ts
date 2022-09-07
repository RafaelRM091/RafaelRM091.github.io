import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    balanca: '',
    serieBalanca: '',
    inmetroBalanca: '',	
    observacao: '',
    prioridade: '',
    status: '',
    defeito: '',
    solucao: ''
  }

  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private service: OsService,
    private router: Router) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById():void {
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta;
    })
  }

  return():void {
    this.router.navigate(['os'])
  }

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=> {
        pdf.save("teste.pdf");
      }
    }); 
  }

}
