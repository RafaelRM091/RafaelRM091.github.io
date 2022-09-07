import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Balanca } from 'src/app/models/balanca';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { BalancaService } from 'src/app/services/balanca.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    balanca: '',
    status: '',
    prioridade: '',
    serieBalanca: '',
    inmetroBalanca: '',
    defeito: '',
    solucao:'',
    observacao: '',
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []
  balancas: Balanca[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private balancaService: BalancaService,
    private service: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
    this.listarBalancas();
  }

  create():void {
    this.service.create(this.os).subscribe(resposta => {
      this.service.message("Ordem de Serviço criada com sucesso!");
      this.router.navigate(['os'])
    })
  }

  cancel():void {
    this.router.navigate(['os'])
  }

  listarTecnicos():void{
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes():void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  
  listarBalancas():void{
    this.balancaService.findAll().subscribe(resposta => {
      this.balancas = resposta;
    })
  }
}
