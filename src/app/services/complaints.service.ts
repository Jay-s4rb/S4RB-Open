import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Constants } from '../Constants'
import { ComplaintsPerMillionUnitsComponent } from '../complaints-per-million-units/complaints-per-million-units.component';
import { ComplaintsPerMillionUnits } from '../models/ComplaintsPerMillionUnits.model'

import * as moment from 'moment';
import { empty } from 'rxjs/observable/empty';



@Injectable()
export class ComplaintsService {

  constructor(public http: Http) {}

  private complaintsPerMillionUnitsUrl = Constants.baseUrl + '/CPMU';


  // On subscribe returns an array of complaintsPerMillionUnits data per month
  public getCPMUDataMonthly(): Observable<any> {
    return this.http.get(this.complaintsPerMillionUnitsUrl)
    .map(CPMUList => {
      // Return data as JSON
      return CPMUList.json() as Array<ComplaintsPerMillionUnits>;
    })
    .map(CPMUList => {

      // Checks list length before proceeding
      if(CPMUList.length > 0){
        CPMUList = this.getMissingMonths(CPMUList);
        CPMUList = this.calcMonthlyCPMU(CPMUList);
      }

      return CPMUList;
    })
    .catch(err => {
      return Observable.throw(err);
    })
  }

   // On subscribe returns an array of complaintsPerMillionUnits data per quarter
   public getCPMUDataQuarterly(): Observable<any> {
    return this.http.get(this.complaintsPerMillionUnitsUrl)
    .map(CPMUData => {
      // Returns CPMU data as JSON
      return CPMUData.json();
    })
    .map(CPMUData => {

      // Checks list length before proceeding
      if(CPMUData.length > 0){

        CPMUData = this.getMissingMonths(CPMUData);
        CPMUData = this.sortQuarterly(CPMUData);
        CPMUData = this.calcQuarterlyCPMU(CPMUData);
        
      }

      return CPMUData;
    })
    .catch(err => {
      return Observable.throw(err);
    })
  }

  // Gets and fills in any missing months from a list of CPMU objects
  private getMissingMonths(CPMUList){
    // Set start and end dates
    let currentDate = CPMUList[0].Month;
    let lastDate = CPMUList[CPMUList.length - 1].Month;

    // Loops through every month between start and end date and pushes any missing months
    for(let i = 0; moment(currentDate).format('DDMMYYYY') != moment(lastDate).add(1, 'month').format('DDMMYYYY'); i++){
      if(moment(CPMUList[i].Month).format('DDMMYYYY') != moment(currentDate).format('DDMMYYYY')){
        let quarter = this.getQuarter(moment(currentDate));
        CPMUList.splice(i, 0, {Quarter: quarter, Month: moment(currentDate).format('DD MMMM YYYY'), Complaints: 0, UnitsSold: 0, CPMU: 0});
      }
      // Format existing months
      if(CPMUList[i].CPMU != 0){
        CPMUList[i].Month = moment(CPMUList[i].Month).format('DD MMMM YYYY');
      }
      currentDate = moment(CPMUList[i].Month).add(1, 'month').startOf('month').toISOString();
    }

    return CPMUList;
  }

  // Sorts and returns a list of monthly data into quarters per year
  private sortQuarterly(CPMUList){
    let quarterlyCPMUData;

    // Sorts monthly data into year->quarter nodes
    quarterlyCPMUData = CPMUList.reduce((o, v) => {
      if(o && v){
        o[moment(v.Month).year()] = o[moment(v.Month).year()] || [];
        o[moment(v.Month).year()][v.Quarter] = o[moment(v.Month).year()][v.Quarter] || [];
        o[moment(v.Month).year()][v.Quarter].push(v);
        return o;
      }
    }, Object.create({}))
    
    // Removes empty arrays at the start of each year
    Object.keys(quarterlyCPMUData).forEach(year => {
      quarterlyCPMUData[year].splice(0,1)
    })
    
    return quarterlyCPMUData;
  }

  // Returns quarterly average CPMU data
  private calcQuarterlyCPMU(quarterlyCPMUData){
    let complaints = 0;
    let units = 0;
    // Loop through each year
    Object.keys(quarterlyCPMUData).forEach(year => {
      // Loop through each quarter of each year
      Constants.quarters.forEach( quarter => {
        // Checks if quarter exists in year
        if(quarterlyCPMUData[year][quarter]){
          let i = 0;
          // Loops through each month in quarter
          quarterlyCPMUData[year][quarter].forEach(element => {

            // Check to exclude months with no data
            if(element.CPMU != 0){
              complaints += element.Complaints;
              units += element.UnitsSold;
            }

          });
          // Calculate the quarterly average
          quarterlyCPMUData[year][quarter].CPMUAverage = +(complaints / units * 1000000).toFixed(8) || 0;
          complaints = 0;
          units = 0;
        }
      })
    })
    return quarterlyCPMUData;
  }

  // Returns a list of CPMU objects with their CPMU value calculated
  private calcMonthlyCPMU(CPMUList){
    // Filter to exclude months without data loops through months with data
    CPMUList.filter(CPMUObject => CPMUObject.CPMU != 0 ).forEach(CPMUObject => {
      CPMUObject.CPMU = +(CPMUObject.Complaints / CPMUObject.UnitsSold * 1000000).toFixed(8);
    });

    return CPMUList;
  }

  // Returns a the quarter that a given month belongs to
  private getQuarter(date){
    switch(date.month()) {
      case 0:
          return '1';
      case 1:
          return '1';
      case 2:
          return '1';
      case 3:
          return '2';
      case 4:
          return '2';
      case 5:
          return '2';
      case 6:
          return '3';
      case 7:
          return '3';
      case 8:
          return '3';
      case 9:
          return '4';
      case 10:
          return '4';
      case 11:
          return '4';
      default:
          return;
    }
  }
}
