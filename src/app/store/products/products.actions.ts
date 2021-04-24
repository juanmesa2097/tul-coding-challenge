export namespace ProductsActions {
  enum ActionType {
    Fetch = '[Products] Fetch',
  }

  export class Fetch {
    static readonly type = ActionType.Fetch;
  }
}
