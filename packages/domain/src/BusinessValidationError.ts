import { BusinessRule } from "./BusinessRule.js";

export class BusinessValidationError extends Error {
  public _rule: BusinessRule;
  constructor(rule: BusinessRule) {
    super(rule.toString());
    this._rule = rule;
  }
}
