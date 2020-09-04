import { EmailValidator } from '../protocols/EmailValidator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false
  }
}
