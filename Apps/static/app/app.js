import angular from 'angular'
import template from 'html-loader!./app.html'
import SyntheseModule from './synthese/synthese.module'

const appModule = angular.module('app', [SyntheseModule.name]);

class AppController {
	constructor(){
		this.state = {
		}
	}
}


appModule.component('app', {
	  controller : AppController,
	  template : template,
	  bindings : {}

	});


export default appModule;
