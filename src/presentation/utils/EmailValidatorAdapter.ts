import { EmailValidator } from '../protocols/EmailValidator'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}
