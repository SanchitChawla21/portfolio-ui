import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { PortfolioDto } from './models/portfolio';
import { TickerService } from './services/ticker.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'ArrowStreet';

  public portfolioDetails!: PortfolioDto;
  gridApi!: GridApi;
  document!: Document;
  rowData: any;
  columnDefs: ColDef[] = [];
  defaultColDef: any;
  private gridColumnApi: any;

  /**
   *
   */
  constructor(
    private tickerService: TickerService,
    private snackBar: MatSnackBar
  ) {
    this.defaultColDef = {
      flex: 1,
      editable: false,
      resizable: true,
      // filter: 'agTextColumnFilter',
      sortable: true,
    };

    this.columnDefs = [
      { headerName: 'Stock Name', field: 'stockName' },
      { headerName: 'Ticker', field: 'ticker' },
      {
        headerName: 'Avg Buying Cost',
        field: 'averageBuyingCostPerShare',
        //  valueFormatter: params => this.currencyFormatter(params.data.currency, '$'),
        filter: 'agNumberColumnFilter',
      },

      {
        headerName: 'Total Gain/Loss',
        field: 'totalGainOrLoss',
        filter: 'agNumberColumnFilter',
      },

      {
        headerName: 'Quantity',
        field: 'quantity',

        filter: 'agNumberColumnFilter',
      },

      {
        headerName: 'Total Current Value',
        field: 'totalCurrentValue',

        filter: 'agNumberColumnFilter',
      },

      {
        headerName: 'Last Price/Share',
        field: 'lastPricePerShare',

        filter: 'agNumberColumnFilter',
      },
    ];
  }
  ngAfterViewInit(): void {
    this.refreshPortfolio();
  }

  refreshPortfolio() {
    setTimeout(() => {
      this.tickerService.getPorfolioDetails().subscribe(
        (data) => {
          console.log(data);
          this.portfolioDetails = data;
          this.rowData = this.portfolioDetails.trade;
          this.gridApi.setRowData(this.rowData)
        },
        (error) => this.snackBar.open(error, '', { duration: 5000 })
      );
    }, 200);
  }

  currencyFormatter(currency: any, sign: any) {
    var sansDec = currency.toFixed(0);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + `${formatted}`;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.setRowData(this.rowData);
    this.gridApi.refreshCells();
  }

  isForceRefreshSelected() {
    return this.document.querySelector('#forceRefresh');
  }
  isSuppressFlashSelected() {
    return this.document.querySelector('#suppressFlash');
  }

  callRefreshAfterMillis(params: any, millis: any, gridApi: any) {
    setTimeout(function () {
      gridApi.refreshCells(params);
    }, millis);
  }
}
