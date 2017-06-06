import template from 'html-loader!./map.template.html'


class MapController{
	constructor(SyntheseProxy){
		const mapCtrl = this;
		this.state = {
			'color': 'blue',
			'geojsonToDirective': null,
		}
		this.layersDict = {};
		this.selectLayer = undefined;

		this.center = {
			'lat': configuration.MAP.COORD_CENTER.Y, 
			'lng': configuration.MAP.COORD_CENTER.X,
			'zoom': configuration.MAP.ZOOM_LEVEL
		};

		this.onEachFeature = this.onEachFeature.bind(this);

		this.originStyle = {
		    "color": "#3388ff",
		    "fill": true,
		    "fillOpacity": 0.2,
		    "weight":3
		};

		this.selectedStyle = {
		  'color':'#ff0000',
		   'weight':3
		};

		this.mailleStyle = {
	    "color": "#000000",
	    "weight": 1,
	    "fillOpacity": 0
		};


		this.$onChanges = (changes => {
			if (changes.data){
				if(changes.data.currentValue != undefined){
				const reduceGeojsonMaille = {'type': 'FeatureCollection',
						'features' : []
					}
				var i=0;
				var copyGeojson = changes.data.currentValue.maille.features.slice();


				while(i<copyGeojson.length){
					let currentFeature= copyGeojson[i];
					let currentIdMaille = currentFeature.properties.id;
					let geometry = currentFeature.geometry;
					console.log('current feature');
					console.log(currentFeature);

					let properties = {'code_maille' : currentIdMaille,
								   'nb_observation' : 1,
								   'id' : currentFeature.properties.id,
								   'id_synthese': [currentFeature.properties.id_synthese],
								   'lb_nom': [currentFeature.properties.lb_nom],
								   'cd_nom': [currentFeature.properties.cd_nom],
								   'observateurs': [currentFeature.properties.observateur],
								   'date' : [currentFeature.properties.date]}
					var j = 0;
					while(j < copyGeojson.length){
						if (i != j && copyGeojson[j].properties.id === currentIdMaille){

							properties.nb_observation++;
							properties.id_synthese.push(copyGeojson[j].properties.id_synthese);
							properties.lb_nom.push(copyGeojson[j].properties.lb_nom);
							properties.cd_nom.push(copyGeojson[j].properties.cd_nom); 
							properties.observateurs.push(copyGeojson[j].properties.observateur);
							properties.date.push(copyGeojson[j].properties.date);
							//si il y etait deja on peut le remover
							copyGeojson.splice(j,1);
						}
						j = j+1;
					}
					reduceGeojsonMaille.features.push({
			          'type' : 'Feature',
			          'properties' : properties,
			          'geometry' : geometry   
					})
					i = i+1;
				}

				const newGeojson = {'point':changes.data.currentValue.point, 'maille': reduceGeojsonMaille}

				this.loadGeojsonPoint(newGeojson);
				}
			}
			// if change from the list, zoom on the selected layers
			if(changes.currentLeafletObs){
				if(changes.currentLeafletObs.currentValue != undefined){
					onCurrentObsChange(changes.currentLeafletObs.currentValue);
				}
			}
		})

	}// END CONSTRUTOR

	onEachFeature (feature, layer){
		const mapCtrl = this;
		// build the dict of layers
		this.layersDict[feature.properties.id] = layer;
		layer.on({
			click : function(){
				// update the properties in the app controller
				//mapCtrl.mainController.updateCurrentListObs(feature.properties);
				// set the style and popup
				if (mapCtrl.selectLayer != undefined){
						mapCtrl.selectLayer.setStyle(mapCtrl.originStyle)
					}
				mapCtrl.selectLayer = layer;
				mapCtrl.styleAndPopup(mapCtrl.selectLayer);	
			}
		});
	};

	styleAndPopup(selectLayer){
		// set the style
		selectLayer.setStyle(this.selectedStyle);
		//bind the popup
		if(selectLayer instanceof L.Polygon){
			table = "<p>"+selectLayer.feature.properties.nb_observation+" observation(s)</p><table class='table'><thead><tr> <th>Observateur </th> <th>Nom </th>  <th>Date</th></tr></thead> <tbody>"
			selectLayer.feature.properties.id_synthese.forEach(function(obs, index){
				table+="<tr> <td>"+selectLayer.feature.properties.observateurs[index]+" </td> <td>"+selectLayer.feature.properties.lb_nom[index]+" </td> <td> "+selectLayer.feature.properties.date[index]+"</td> </tr>"
			})
			table+="</tbody> </table>"
			selectLayer.bindPopup(table).openPopup();

		}else{
			selectLayer.bindPopup("<b>Observateur: </b> "+selectLayer.feature.properties.observateur+"<br> <b> Nom sc. : </b>  "+selectLayer.feature.properties.lb_nom+" <br> <b> Date: </b>  "+selectLayer.feature.properties.date+" <br>").openPopup();
		}
      	
      	selectLayer.setStyle(this.selectedStyle);
	};

	loadGeojsonPoint(currentGeojson){
		const mapCtrl = this
			mapCtrl.state.geojsonToDirective = {
				'point' : {
					'data' : currentGeojson.point,
					 pointToLayer: function (feature, latlng) {
					 	var marker = L.circleMarker(latlng);
					 	mapCtrl.layersDict[feature.properties.id] = marker;
			    		return marker;
					},
					'onEachFeature': this.onEachFeature,
				},
				'maille': {
					'data': currentGeojson.maille,
					'onEachFeature' : this.onEachFeature,
					}
		 	}
		}

}

MapController.$inject = ['synthese.proxy']

const mapComponent = {
		controller: MapController,
		template : template,
		bindings : {
			'data': '<'
		}
	}


export default mapComponent;


