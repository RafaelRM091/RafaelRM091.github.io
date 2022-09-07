import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Balanca } from 'src/app/models/balanca';
import { BalancaService } from 'src/app/services/balanca.service';

@Component({
  selector: 'app-balanca-delete',
  templateUrl: './balanca-delete.component.html',
  styleUrls: ['./balanca-delete.component.css']
})
export class BalancaDeleteComponent implements OnInit {
  id_bal = ''

  balanca: Balanca = {
    id: '',
    marca: '',
    modelo: '',
    anoFabricacao: '',
    capacidade: '',
    divisao: ''
  }
  
  constructor(
    private router: Router,
    private service: BalancaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_bal = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_bal).subscribe(resposta => {
      this.balanca = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.id_bal).subscribe(resposta => {
      this.router.navigate(['balancas'])
      this.service.message('Balança deletada com sucesso!')
    }, err => {
      if(err.error.error.match('possui Ordens de Serviço')) {
        this.service.message(err.error.error);
      }
    })
  }

  cancel():void {
    this.router.navigate(['balancas'])
  }

}