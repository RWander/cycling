module Cycling {
  export class CyclingController implements Repository {
    get(): Athlete {
      return new Athlete('Роман', 'Корнеев');
    }
  }
}
