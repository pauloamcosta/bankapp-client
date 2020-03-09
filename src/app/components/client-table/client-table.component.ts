import { Component, OnInit, OnChanges } from '@angular/core';
import { Client } from 'src/app/model/client';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {
  client = {} as Client;
  clients: Client[];
  displayedColumns: string[] = ['id', 'name', 'account'];
  dataSource;

  ngOnInit(): void {
    this.getClients();
  }

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }

  getClients() {
    this.apiService.getAllClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      this.dataSource = new MatTableDataSource(this.clients);
    });
  }

  getClient(id: number) {
    this.apiService.getClientById(id).subscribe((clientDecrypted: Client) => {
      this.client.name = clientDecrypted.name;
      this.client.account = clientDecrypted.account;
      this.openSnackBar('Client Decrypted', 'x');
    });
  }


  saveClient(form: NgForm) {
    this.client.id = this.clients.length + 1;
    this.apiService.saveClient(this.client).subscribe(() => {
      this.openSnackBar('Client encrypted saved', 'x');
      this.cleanForm(form);
    });

  }
  cleanForm(form: NgForm) {
    form.resetForm();
    this.client = {} as Client;
    this.ngOnInit();
  }

  selectRow(row) {
    this.client.id = row.id;
    this.client.name = row.name;
    this.client.account = row.account;
  }

  hasNumber(myString: string) {
    return /\d/.test(myString);
  }

  isEncrypted(myString: string) {
    return myString.includes('==');
  }

}
