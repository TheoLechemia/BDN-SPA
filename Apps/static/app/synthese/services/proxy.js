export default class SyntheseProxy{
	constructor($http){
		this.$http = $http;
	}

	lastObs(){
        return this.$http.get(configuration.URL_APPLICATION+"synthese/lastObs");
		}
	sendData (data){
		return this.$http.post(configuration.URL_APPLICATION+"synthese/getObs", data)
	}

	loadTaxons(expre, protocole){
		return this.$http.get(configuration.URL_APPLICATION+"synthese/loadTaxons/"+expre+"/"+protocole)
	}
	loadCommunes(){
		return this.$http.get(configuration.URL_APPLICATION+"synthese/loadCommunes")
	}
	loadForets(){
		return this.$http.get(configuration.URL_APPLICATION+"synthese/loadForets")
	}
	loadTypologgie (){
		return this.$http.get(configuration.URL_APPLICATION+"synthese/loadTypologgie")
	}
	exportShapeFile (data){
		return this.$http.post(configuration.URL_APPLICATION+"synthese/export", data)
	}
	loadTaxonomyHierachy (rang_fils, rang_pere, rang_grand_pere, value_rang_grand_pere, value){
		return this.$http.get(configuration.URL_APPLICATION +"synthese/loadTaxonomyHierachy/"+rang_fils+"/"+rang_pere+"/"+rang_grand_pere+"/"+value_rang_grand_pere+"/"+value)
	}
	loadProtocole(){
		return this.$http.get(configuration.URL_APPLICATION+"synthese/loadProtocoles")
	}		

}

SyntheseProxy.$inject = ['$http'];

