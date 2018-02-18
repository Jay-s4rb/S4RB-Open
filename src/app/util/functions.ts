import { Observable } from 'rxjs/Observable';

//Utility Functions

export function handleError (error: Response | any) {
  console.error('JsonService::handleError', error);
  return Observable.throw(error);
}

export function calcCPMU(complaints: number, unitsSold: number){
  return (complaints/unitsSold)*1000000;
}
