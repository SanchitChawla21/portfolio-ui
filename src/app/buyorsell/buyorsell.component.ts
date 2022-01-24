import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionDto, TransactionType } from '../models/portfolio';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-buyorsell',
  templateUrl: './buyorsell.component.html',
  styleUrls: ['./buyorsell.component.css'],
})
export class BuyorsellComponent implements OnInit {
  @Output() valueChange = new EventEmitter();

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  tradeForm!: FormGroup;
  submitted = false;
  selectedTicker: any;
  public message: string | undefined;
  get formControls() {
    return this.tradeForm.controls;
  }

  public tradeOptions = ['BUY', 'SELL'];

  public tradeOptionControl = new FormControl('', [Validators.required]);
  public tickerNameControl = new FormControl('', [Validators.required]);
  public quantityControl = new FormControl('', [Validators.required]);
  public priceControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private tickerService: TickerService, private snackBar:MatSnackBar
  ) {
    this.tradeForm = new FormGroup({
      tradeType: this.tradeOptionControl,
      ticker: this.tickerNameControl,
      quantity: this.quantityControl,
      price: this.priceControl,
    });
  }

  ngOnInit(): void {}

  onRefresh(): any {
    this.valueChange.emit();
    this.snackBar.open("Refreshed Successfully", "",{duration: 5000});
  }

  onSubmit(): any {
    this.submitted = true;
    this.message = "";
    // stop here if form is invalid
    if (this.tradeForm.invalid) {
      return;
    }
    var option = <TransactionDto>{
      ticker: this.tickerNameControl.value,
      transactionType: this.tradeOptionControl.value,
      quantity: this.quantityControl.value,
      tickerPrice: this.priceControl.value,
    };

    var action = this.tradeOptionControl.value ==="BUY"? "BOUGHT":"SOLD"
    this.tickerService.buyOrSellStocks(option).subscribe(result=>

      {
      this.message = "Successfully " +  action + ", " + result.quantity + " of " + option.ticker + " at price " + option.tickerPrice;
      this.snackBar.open(this.message,"",{duration: 5000});
      this.valueChange.emit(option);
      setTimeout(() => this.formGroupDirective.resetForm(), 200);
      },
      error=> this.snackBar.open(error.error.message,"",{duration: 5000})
    );


    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.tradeForm.value));
  }
}
