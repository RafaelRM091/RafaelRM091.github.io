import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Balanca } from 'src/app/models/balanca';
import { BalancaService } from 'src/app/services/balanca.service';

@Component({
  selector: 'app-balanca-update',
  templateUrl: './balanca-update.component.html',
  styleUrls: ['./balanca-update.component.css']
})
export class BalancaUpdateComponent implements OnInit {

  id_bal = ''

  balanca: Balanca = {
    id: '',
    marca: '',
    modelo: '',
    anoFabricacao: '',
    capacidade: '',
    divisao: ''
  }

  
  marca = new FormControl('', [Validators.minLength(2)])
  capacidade = new FormControl('', [Validators.minLength(1)])

  constructor(
    private router: Router,
    private service: BalancaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_bal = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update():void {
    this.service.update(this.balanca).subscribe((resposta) => {
      this.router.navigate(['balancas'])
      this.service.message('Balança atualizada com sucesso!')
    })
  }
  
  findById(): void {
    this.service.findById(this.id_bal).subscribe(resposta => {
      this.balanca = resposta;
    })
  }


  cancel():void {
    this.router.navigate(['balancas'])
  }

  errorValidMarca() {
    if(this.marca.invalid) {
      return 'A Marca deve ter no mínimo 2 caracteres';
    }
    return false;
  }

  errorValidCapacidade() {
    if(this.marca.invalid) {
      return 'A Capacidade deve ter no mínimo 1 caracter'
    }
    return false;
  }
}
