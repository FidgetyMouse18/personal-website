class MinMax {
  private _Min: number;
  private _Max: number;
  constructor() {
    this._Min = Number.MAX_VALUE;
    this._Max = Number.MIN_VALUE;
  }

  public get Max(): number {
    return this._Max;
  }
  public get Min(): number {
    return this._Min;
  }

  AddValue(num: number) {
    if (num > this._Max) {
      this._Max = num;
    }
    if (num < this._Min) {
      this._Min = num;
    }
  }
}

export default MinMax;
