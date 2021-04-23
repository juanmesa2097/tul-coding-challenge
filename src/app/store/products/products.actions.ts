export namespace ProductsActions {
  enum ActionType {
    Fetch = '[Products] Fetch',
    FetchByIds = '[Products] FetchByIds',
  }

  export class Fetch {
    static readonly type = ActionType.Fetch;
  }

  export class FetchByIds {
    static readonly type = ActionType.FetchByIds;
    constructor(public payload: string[]) {}
  }
}
