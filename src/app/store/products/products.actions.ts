export namespace ProductsActions {
  enum ActionTypes {
    Get = '[Products] Fetch',
  }

  export class Fetch {
    static readonly type = ActionTypes.Get;
  }
}
