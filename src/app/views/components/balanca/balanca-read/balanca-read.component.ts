import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Balanca } from 'src/app/models/balanca';
import { BalancaService } from 'src/app/services/balanca.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-balanca-read',
  templateUrl: './balanca-read.component.html',
  styleUrls: ['./balanca-read.component.css']
})
export class BalancaReadComponent implements AfterViewInit {

  balancas: Balanca[] = [];
  
  displayedColumns: string[] = ['id', 'marca', 'modelo', 'anoFabricacao', 'capacidade', 'divisao', 'action'];
  dataSource = new MatTableDataSource<Balanca>(this.balancas);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : BalancaService,
    private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.balancas = resposta;
      this.dataSource = new MatTableDataSource<Balanca>(this.balancas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })    
  }

  navigateToCreate():void {
    this.router.navigate(['balancas/create'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}