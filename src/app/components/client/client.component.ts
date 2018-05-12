import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    console.log('hello');
    this.clientService.getClients().subscribe(clients => 
      {
        this.clients = clients;
        this.getTotalOwed();
        console.log(this.clients);
      }
      );
  }

  getTotalOwed(){
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0)
  }

}
