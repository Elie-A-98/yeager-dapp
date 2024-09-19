import { BusinessRule } from "./BusinessRule.js";

export class BusinessValidationError extends Error {
  public _rule: BusinessRule;
  constructor(rule: BusinessRule) {
    super(rule.message);
    this._rule = rule;
  }
}
