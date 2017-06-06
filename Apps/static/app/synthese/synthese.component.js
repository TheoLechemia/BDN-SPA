import SyntheseProxy from './services/proxy'
import template from 'html-loader!./synthese.template.html'


class SyntheseController{
	constructor(SyntheseProxy){
		const synCtrl = this;
		synCtrl.state = {
			'currentId': 'lala',
			'geojson' : null
		}

		synCtrl.$onInit = function(){
			console.log('init synthese')
			 SyntheseProxy.lastObs().then(response => {
				synCtrl.state.geojson = response.data;
				console.log(synCtrl.state.geojson)
			});
			
		}
	}// end constructor



}

SyntheseController.$inject = ['synthese.proxy'];

const syntheseComponent = {
	controller: SyntheseController,
	template: template,
	}


export default syntheseComponent

