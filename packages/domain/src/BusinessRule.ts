interface IBusinessRule {
  message: Readonly<string>;
  isBroken(): boolean;
}

export abstract class BusinessRule implements IBusinessRule{
    public toString(){
        return `${this.constructor.name}: ${this.message}`
    }
    abstract message: string;
    abstract isBroken(): boolean;
}