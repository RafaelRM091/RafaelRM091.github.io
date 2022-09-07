import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Balanca } from 'src/app/models/balanca';
import { BalancaService } from 'src/app/services/balanca.service';

@Component({
  selector: 'app-balanca-create',
  templateUrl: './balanca-create.component.html',
  styleUrls: ['./balanca-create.component.css']
})
export class BalancaCreateComponent implements OnInit {

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
    private service: BalancaService) { }

  ngOnInit(): void {
  }

  cancel():void {
    this.router.navigate(['balancas'])
  }

  create():void {
    this.service.create(this.balanca).subscribe((resposta) => {
      this.router.navigate(['balancas'])
      this.service.message('Balança criada com sucesso!')
    }, err => {
      console.log(err)
    })
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
