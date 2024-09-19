interface IBusinessRule {
  message: Readonly<string>;
  isBroken(): Promise<boolean>;
}

export abstract class BusinessRule implements IBusinessRule{
    public toString(){
        return `${this.constructor.name}: ${this.message}`
    }
    abstract message: string;
    abstract isBroken(): Promise<boolean>;
}