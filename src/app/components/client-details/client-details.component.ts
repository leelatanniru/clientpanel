import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: Boolean = false;


  constructor(private clientService: ClientService,
  private router: Router,
  private route: ActivatedRoute,
  private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    //get id from url
    this.id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this.id).subscribe(client => {
      console.log(client);
      if(client != null)
      {
        if(client.balance > 0){
          this.hasBalance = true;
          console.log(this.client);
        }
      }
      this.client = client;

    }) 
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessagesService.show('Client successfully updated', { cssClass: 'alert-success', timeout: 4000 });
    
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(this.client);
      this.flashMessagesService.show('Client successfully removed', { cssClass: 'alert-success', timeout: 4000 }); 
      this.router.navigate(['/']);    
    }
  } 



}
