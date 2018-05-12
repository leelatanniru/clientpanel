import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { Settings } from '../../models/Settings';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(private router: Router,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService) {

     }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesService.show('settings changed', { cssClass: 'alert-success', timeout: 4000 });

  }

}
