import { ICart } from "./cart.model";
import { AddToCart, CartState, UpdateItem, RemoveItem } from "./cart.state";
import { Component, OnInit } from "@angular/core";
import { CartService } from "./cart.service";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public products;
  @Select(CartState)
  cart: Observable<ICart[]>;

  constructor(private service: CartService, private store: Store) {}

  ngOnInit() {
    this.getProducts();
  }

  public addToCart(id) {
    const item: ICart = {
      id,
      quantity: 1
    };
    this.store.dispatch(new AddToCart(item));
  }

  public deleteItem(index) {
    this.store.dispatch(new RemoveItem(index));
  }

  public updateItem(item: ICart, quantity) {
    const obj: ICart = {
      id: item.id,
      quantity
    };
    this.store.dispatch(new UpdateItem(obj));
  }

  private getProducts() {
    this.service.getItems().subscribe(res => {
      this.products = res;
    });
  }
}
