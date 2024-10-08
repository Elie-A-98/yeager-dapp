import { BusinessRule } from "./BusinessRule.js";
import { BusinessValidationError } from "./BusinessValidationError.js";

export class ValueObject {
  protected constructor() {}
  protected static async validateRule(rule: BusinessRule) {
    if (await rule.isBroken()) {
      throw new BusinessValidationError(rule);
    }
  }
}
