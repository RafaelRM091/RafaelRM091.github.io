import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { BalancaService } from 'src/app/services/balanca.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  lista: OS[] = [];

  displayedColumns: string[] = ['cliente', 'tecnico', 'abertura', 'fechamento', 
  'prioridade', 'status', 'balanca', 'serie', 'inmetro', 'defeito', 'solucao', 'observacao', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private service : OsService,
    private router : Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private balancaService: BalancaService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.lista = resposta;
      this.listarTecnico();
      this.listarCliente();
      this.listarBalanca();
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })    
  }

  navigateToCreate():void {
    this.router.navigate(['os/create'])
  }

  listarTecnico():void {
    this.lista.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }
  
  listarCliente():void {
    this.lista.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }

  listarBalanca():void {
    this.lista.forEach(x => {
      this.balancaService.findById(x.balanca).subscribe(resposta => {
        x.balanca = resposta.marca
      })
    })
  }

  prioridade(x : any) {
    if(x == 'BAIXA') {
      return 'baixa'
    } else if(x == 'MEDIA') {
      return 'media'
    } else {
      return 'alta'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
