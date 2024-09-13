import { BusinessRule } from "./BusinessRule.js";
import { BusinessValidationError } from "./BusinessValidationError.js";

export class ValueObject {
  protected constructor() {}
  protected static validateRule(rule: BusinessRule) {
    if (rule.isBroken()) {
      throw new BusinessValidationError(rule);
    }
  }
}
