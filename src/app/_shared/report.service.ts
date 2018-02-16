import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { CPMU } from './CMPU';

@Injectable()
export class ReportService {
  private dbUrl = 'http://localhost:3000/CPMU';

  constructor(private http: Http) { }

  getCPMU(): Promise<Array<CPMU>> {
    return this.http
      .get(this.dbUrl)
      .toPromise()
      .then((response) => {
        return this.addMissingMonths(response.json())
          .map(o => {
            // Pass only information needed
            return {
              CPMU: this.calcCPMU(o.Complaints, o.UnitsSold),
              ...o,
              Month: this.setDateForm(o.Month),
            }
          }) as Array<CPMU>
      }).catch(this.handleError);
  }

  getCPMUByQuarter(): Promise<Array<CPMU>> {
    return this.http
      .get(this.dbUrl)
      .toPromise()
      .then((response) => {
        return this.groupByQuarter(response.json())
          .map(o => {
            // Pass only information needed
            return {
              ...o,
              Year: this.getYear(o.Month),
              Quarter: o.Quarter,
              CPMU: this.calcCPMU(o.Complaints, o.UnitsSold)
            }
        }) as Array<CPMU>
      }).catch(this.handleError);
  }

  /**
    * Fills in the missing months
    * @param {Array} Array of CMPU
    * @returns {Array} Array of CMPU with missing dates
  */
  private addMissingMonths(arr: Array<CPMU>): Array<CPMU> {
    const ammendedArr = [].concat(arr);

    // Group Records by year
    const grouped = ammendedArr.reduce((n, i) => {
      const val = this.getYear(i.Month);
       n[val] = n[val] || [];
       n[val].push(i);
       return n;
    }, {});

    // For each year check if all have 12 months
    for(let i in grouped) {
      let year = grouped[i];
      for(let month = 0; month < 12; month++) {
        // If it cannot find month in year than add 'no value' record
        if(
          !year.find(
            r => this.getMonth(r.Month) === month && this.getYear(r.Month) === parseInt(i)
          )
        ) {
          ammendedArr.push({
            Month: `${i}-${month > 10 ? month +1 : '0' + (month + 1)}-01`,
            CPMU: 'No Value'
          });
        };
      }
    };

    // Fix the order as 'no value recods are at the end'
    return ammendedArr.sort((a, b) => (new Date(a.Month) < new Date(b.Month) ? -1 : 1));
  }

  /**
  * Group data by quater
  * @param {Array} Array of CMPU
  * @returns {Array} Array of CMPU Grouped by quater
  */
  private groupByQuarter(arr: Array<any>): Array<any> {
    return arr.reduce((n, i) => {
      // Is new array empty
      n = !n.length ? [] : n;
      // If length greater than 0 && if month and quater the same then add together
      if (
        n.length >= 1 &&
        this.getYear(n[n.length - 1].Month) === this.getYear(i.Month) &&
        n[n.length - 1].Quarter === i.Quarter
      ) {
        n[n.length - 1].Complaints += i.Complaints;
        n[n.length - 1].UnitsSold += i.UnitsSold;
      } else {
        // Else add new entry
        n.push(i);
      }
      return n
    }, {});
  }

  /**
    * Calculate CPMU
    * @param {number} Complaints
    * @param {number} UnitsSold
    * @returns {number} CMPU
  */
  private calcCPMU(Complaints: number, UnitsSold: number): number {
    return (Complaints / (UnitsSold / 1000000));
  }

  /**
    * Formats a string to desired format e.g. January 2017
    * @param {string} date string in ISO format
    * @returns {string} Formated date string
  */
  private setDateForm(date: string): string {
    return new Date(date)
      .toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });
  }

  /**
    * Returns year of date
    * @param {string} date
    * @returns {string} year
  */
  private getYear(date: string): number {
    return new Date(date).getFullYear();
  }

  /**
    * Returns month of date
    * @param {string} date
    * @returns {string} month
  */
  private getMonth(date: string): number {
    return new Date(date).getMonth();
  }

  /**
  * Handles error
  * @param {any}
  * @returns {Promise}
  */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
