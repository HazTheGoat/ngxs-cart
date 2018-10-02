import { ICart } from "./cart.model";
import { Action, State, StateContext } from "@ngxs/store";

export class AddToCart {
  static type = "[CART] AddToCart";

  constructor(public readonly payload: ICart) {}
}

export class UpdateItem {
  static type = "[CART] UpdateItem";

  constructor(public readonly payload: ICart) {}
}

export class RemoveItem {
  static type = "[CART] RemoveItem";

  constructor(public readonly payload: number) {}
}

@State({
  name: "cart",
  defaults: []
})
export class CartState {
  @Action(AddToCart)
  addToCart({ getState, setState }: StateContext<ICart[]>, { payload }: AddToCart) {
    if (getState().some(item => item.id === payload.id)) {
      const newState: ICart[] = [];
      getState().forEach(item => {
        if (item.id === payload.id) {
          item.quantity++;
        }
        newState.push(item);
      });

      setState(newState);
    } else {
      setState([...getState(), payload]);
    }
  }

  @Action(UpdateItem)
  updateItem({ getState, setState }: StateContext<ICart[]>, { payload }: UpdateItem) {
    const newState: ICart[] = [];
    getState().forEach(item => {
      if (item.id === payload.id) {
        item.quantity = payload.quantity;
      }
      newState.push(item);
    });
    setState(newState);
  }

  @Action(RemoveItem)
  removeItem({ getState, setState }: StateContext<ICart[]>, { payload }: RemoveItem) {
    setState(getState().filter((item, i) => i !== payload));
  }
}
