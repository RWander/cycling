module Cycling {
  export class CyclingController implements Repository {
    // $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
		public static $inject = [
			'$scope'
		];

		constructor(private $scope: any) {
      $scope.Athlete = this.get();
		}

    get(): Athlete {
      return new Athlete('Роман', 'Корнеев');
    }
  }
}
