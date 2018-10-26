import { Component, OnInit } from '@angular/core'

// Models
import { Log } from '../models/log.model'

// Services
import { LogsService } from '../services/logs.service'

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {

  public logs: Log[] = []

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.logsService.getLogs()
      .subscribe( (logs: Log[]) => {
        console.log(logs);
        this.logs = logs
      })
  }

  getPhrase(log: Log): string{

    let str: string = '['+ log.datetime.toString() +'] '+ log.login +' '+ this.getAction(log)

    if( log.payload )
      str += ' um payload do endpoint '
    else
      str += ' o endpoint '

    str += '"'+ log.endpoint +'".'

    return str
  }

  private getAction(log: Log): string {
    switch( log.action.toLocaleLowerCase() ){
      case 'post': return 'inseriu'
      case 'put': return 'alterou'
      case 'delete': return 'removeu' 
    }
  }

}
