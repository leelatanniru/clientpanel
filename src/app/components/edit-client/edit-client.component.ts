import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService) { }

    ngOnInit() {
      this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
      //get id from url
      this.id = this.route.snapshot.params['id'];
      //get client
      this.clientService.getClient(this.id).subscribe(client => {     
        this.client = client;
        console.log('helloo');
        console.log(this.client);
      }) 
    }

    onSubmit({value, valid}: {value: Client, valid:boolean}){
      if(!valid){
        this.flashMessagesService.show('please fill the form correctly', { cssClass: 'alert-danger', timeout: 4000 });

      }
      else{
        value.id = this.id;
        console.log(value.id);
        this.clientService.updateClient(value);
        this.flashMessagesService.show('Client successfully edited', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/client/'+this.id]);
      }

    }
  

}
