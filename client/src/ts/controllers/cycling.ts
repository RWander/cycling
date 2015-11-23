module Cycling {
  interface ICyclingScope {
    Athlete: Athlete;
    FullInfo: any;
  }

  export class CyclingController implements Repository {
    // $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
		public static $inject = [
			'$scope',
      '$http'
		];

		constructor(
      private $scope: ICyclingScope,
      private $http: angular.IHttpService) {
      $scope.Athlete = this.get();
      $http.get('http://localhost:5000/').success((data: any) => {
        $scope.FullInfo = data;
      });
		}

    get(): Athlete {
      return new Athlete('Роман', 'Корнеев');
    }
  }
}
