import angular from 'angular'
import 'leaflet'
import 'angular-leaflet-directive'

import SyntheseProxy from './services/proxy'
import syntheseComponent from './synthese.component'
import mapComponent from './components/map/map.component'
import listObsComponent from './components/listObs/listObs.component'

const syntheseModule = angular.module('synthese', ['leaflet-directive'])

syntheseModule.service('synthese.proxy', SyntheseProxy);
syntheseModule.component('synthese', syntheseComponent);
syntheseModule.component('map', mapComponent);
syntheseModule.component('listObs', listObsComponent);

syntheseModule.config(function($logProvider){
  $logProvider.debugEnabled(false);
});



export default syntheseModule;
