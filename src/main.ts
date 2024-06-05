import { Component, HostListener } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { GridModule, MultipleSortSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import '@angular/localize/init';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GridModule],
  styleUrls: ['./styles.scss'],
  template: `
    <h1>Sorting does not work in chrome (and changing sort direction does not work in Firefox)</h1>
    <p>The click target should always be the span inside the table header but never the th itself -> does not work (see also console.log)</p>
    <p>The last click target was</p>
    <code class="code-block">{{ lastClickTarget?.outerHTML }}</code>
    <br>
    <kendo-grid
          [kendoGridBinding]="gridView"
          [sortable]="true"
          [sort]="sort"
          [pageable]="true"
          [pageSize]="10"
          [height]="350"
          [navigable]="true"
        >
          <kendo-grid-column field="OrderID" title="Order ID"> </kendo-grid-column>
          <kendo-grid-column field="ShipCountry" title="Ship Country">
          </kendo-grid-column>
          <kendo-grid-column field="OrderDate" title="Order Date" format="d">
          </kendo-grid-column>
          <kendo-grid-column field="Freight" title="Freight"> </kendo-grid-column>
        </kendo-grid>
  `,
})
export class App {
  name = 'Angular';

  public lastClickTarget?: HTMLElement;

  public gridView: unknown[] = [
    {
      OrderID: 10248,
      CustomerID: 'VINET',
      EmployeeID: 5,
      OrderDate: '1996-07-03T21:00:00.000Z',
      RequiredDate: '1996-07-31T21:00:00.000Z',
      ShippedDate: '1996-07-15T21:00:00.000Z',
      ShipVia: 3,
      Freight: 32.38,
      ShipName: 'Vins et alcools Chevalier',
      ShipAddress: "59 rue de l'Abbaye",
      ShipCity: 'Reims',
      ShipRegion: '',
      ShipPostalCode: '51100',
      ShipCountry: 'France',
    },
    {
      OrderID: 10249,
      CustomerID: 'TOMSP',
      EmployeeID: 6,
      OrderDate: '1996-07-04T21:00:00.000Z',
      RequiredDate: '1996-08-15T21:00:00.000Z',
      ShippedDate: '1996-07-09T21:00:00.000Z',
      ShipVia: 1,
      Freight: 11.61,
      ShipName: 'Toms Spezialitäten',
      ShipAddress: 'Luisenstr. 48',
      ShipCity: 'Münster',
      ShipRegion: '',
      ShipPostalCode: '44087',
      ShipCountry: 'Germany',
    },
  ];

  public sort: SortDescriptor[] = [{ field: 'ShipCountry', dir: 'asc' }];

  public sortSettings: MultipleSortSettings = {
    mode: 'multiple',
    initialDirection: 'desc',
    allowUnsort: true,
    showIndexes: true,
  };

  @HostListener('document:click', ['$event'])
  public onClick(ev: MouseEvent): void {
    console.log('clicked on', ev.target, ev);
    this.lastClickTarget = ev.target as HTMLElement;
  }
}

bootstrapApplication(App);
