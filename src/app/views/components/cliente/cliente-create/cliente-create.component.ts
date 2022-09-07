import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})

export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    cnpj: '',
    nome: '',
    cep: '',
    tipo: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',   
    email: '',
    telefoneResidencial: '',
    obs: '',
  }

  cnpj = new FormControl('', [Validators.minLength(14)])
  nome = new FormControl('', [Validators.minLength(3)])
  logradouro = new FormControl('', [Validators.minLength(3)])
  numero = new FormControl('', [Validators.minLength(1)])
  bairro = new FormControl('', [Validators.minLength(3)])
  telefoneResidencial = new FormControl('', [Validators.minLength(11)])


  constructor(
    private router : Router,
    private service: ClienteService,
    private http: HttpClient) { }
    
  ngOnInit(): void {
  }

  cancel():void {
    this.router.navigate(['clientes'])
  }

  create():void {
    this.service.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('Cliente criado com sucesso!')
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      } else if(err.error.errors[0].message === "número do registro de contribuinte corporativo brasileiro (CNPJ) inválido"){
        this.service.message("CNPJ inválido!")
        console.log(err)
      }
    })
  }

  errorValidCnpj() {
    if(this.cnpj.invalid) {
      return 'O CNPJ deve ter entre 14 e 18 caracteres!';
    }
    return false;
  }  

  errorValidNome() {
    if(this.nome.invalid) {
      return 'O Nome deve ter entre 3 e 100 caracteres!';
    }
    return false;
  }  

  errorValidLogradouro() {
    if(this.logradouro.invalid) {
      return 'O Endereço deve ter entre 3 e 50 caracteres!';
    }
    return false;
  }  

  errorValidNumero() {
    if(this.numero.invalid) {
      return 'O Número deve ter entre 1 e 10 caracteres!';
    }
    return false;
  }  

  errorValidBairro() {
    if(this.bairro.invalid) {
      return 'O nome deve ter entre 3 e 100 caracteres!';
    }
    return false;
  }  

  errorValidTelefone() {
    if(this.telefoneResidencial.invalid) {
      return 'O Telefone deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }  
}
