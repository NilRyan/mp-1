type Gender = 'male' | 'female' | 'LGBTQ+'
export class Customer {
  constructor(private _gender: Gender, private _age: number, private _email: string) { };

  get gender(): Gender {
    return this._gender;
  }

  get age(): number {
    return this._age;
  }

  get email(): string {
    return this._email;
  }
}