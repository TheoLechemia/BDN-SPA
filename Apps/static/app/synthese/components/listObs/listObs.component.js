import template from 'html-loader!./listObs.template.html'

/*class ListObsCtrl {
	contructor(){
		console.log('hello from LIST OBSSSSSSSSSSSSSSSSSSSSSS')
		this.currentPoint = null;
		this.selected = 'point';

		this.$onChanges = function(changes){
		if (changes.dataObs){
			console.log(changes.dataObs)
			if (changes.dataObs.currentValue != undefined){
				this.currentList = changes.dataObs.currentValue.point;
			}
		}

	};

	}// END CONSTRUCTOR


	zoom(geojsonProperties){
		this.mainController.updateCurrentLeafletObs(geojsonProperties);
		this.mainController.updateCurrentListObs(geojsonProperties);
	};

	isCurrentObs(id, row_id_synthese){
			return id == row_id_synthese;	
	};

	

	isSelected(list){
		return this.selected === list;
	};

	changeList(list){
		this.currentList = this.geojson[list];
		this.selected = list;
	};

	exportShape(geojson){
	    proxy.exportShapeFile(geojson).then(function(response){
	      window.location =configuration.URL_APPLICATION+'synthese/uploads/'+response.data;       
	    })
  	};

}// END CONTROLLER*/


class ListObsCtrl{
	constructor(){
		console.log('yolooo');
		this.currentPoint = null;
		this.selected = 'point';

		this.$onChanges = function(changes){
			console.log("changes", changes)
			if (changes.dataObs){
				if (changes.dataObs.currentValue != undefined){
					this.currentList = changes.dataObs.currentValue.point;
					console.log('my current list')
					console.log(this.currentList)
				}
			}
		}
}// END CONSTRUCTOR
	zoom(geojsonProperties){
		this.mainController.updateCurrentLeafletObs(geojsonProperties);
		this.mainController.updateCurrentListObs(geojsonProperties);
	};

	isCurrentObs(id, row_id_synthese){
			return id == row_id_synthese;	
	};

	

	isSelected(list){
		return this.selected === list;
	};

	changeList(list){
		this.currentList = this.geojson[list];
		this.selected = list;
	};

	exportShape(geojson){
	    proxy.exportShapeFile(geojson).then(function(response){
	      window.location =configuration.URL_APPLICATION+'synthese/uploads/'+response.data;       
	    })
  	};
}// END CLASS



const listObsComponent = {

  controller : ListObsCtrl,
  template : template,
  bindings : {
  	'dataObs' : '<',
  	'currentListObs' : '<',
  	'currentLeafletObs': '<',
  }
}

export default listObsComponent;