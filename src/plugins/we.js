// import something here

/*
WiliPlugin.js ini...
Harus setting di quasar.conf.js
*/

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do

	// Vue.prototype.$fnLoading = {

	// 	async loadData(Saya, callBack) {
	// 		Saya.$q.loading.show({message: 'Some important process is in progress. Hang on...'});			
	// 		// console.log('1111')
	// 		await callBack(); 
	// 		Saya.$q.loading.hide();
	// 		// console.log('3333')
	// 	},

	// }

	Vue.prototype.$fnTest = function (payload) {
		alert('1')
	}


	Vue.prototype.$findObj = function (obj, objName, eleName, value) {
		for (var i = 0, len = Object.keys(obj).length; i < len; i++) {
			if (obj[i] != undefined) {
				var found = this.$findDetailObj(obj[i], objName, eleName, value);
				if (found) { return found; }
			}
		}
	},

	Vue.prototype.$findDetailObj = function (element, objName, eleName, matchingTitle){
		 let elementValue =  element[eleName];
		 if (typeof(eleName) === "object") {
			var a = element;
			for (i = 0; i < eleName.length - 1; i++) {
				a = a[eleName[i]];
			}
			if (a != undefined) {
				var vKey = eleName[i];
			 	elementValue =  a[vKey];
			}
		 } 

	     if(elementValue == matchingTitle){
	     // if(element[eleName] == matchingTitle){
	          return element;
	     }else if (element[objName] != null){
	          var i;
	          var result = null;
	          for(i=0; result == null && i < element[objName].length; i++){
	               result = this.$findDetailObj(element[objName][i], objName, eleName, matchingTitle);
	          }
	          return result;
	     }
	     return null;
	}


	// Vue.prototype.$localFormAction = function (Form, HakAkses) {
	// 	if (Form.localFormAction.mode == Form.localFormAction.modeSaving) {
	// 		Form.CommandClick (Form.localFormAction.mode, 'VAEDXLP');
	// 	} else {
	// 		if (Form.localFormAction.modeSaving == "4") {
	// 			Form.CommandClick ('4', 'VAEDXLP');
	// 		    Form.localFormAction.modeSaving = "";
	// 		} else if (Form.localFormAction.modeSaving == "7") {
	// 			Form.CommandClick ('7', 'VAEDXLP');
	// 		    Form.localFormAction.modeSaving = "";
	// 		}
	// 	}
	// 	return Form.localFormAction
	// }

	// Vue.prototype.$loadingView = function (Form
	// 										, loadingMessage="Loading Data... Please Wait..."
	// 										, SpinnerType="audio"
	// 										, loadingColor="white"
	// 									) {
	// 	Form.$q.loading.show({
	// 		spinner: `q-spinner-${SpinnerType}`,
	// 		spinnerColor: loadingColor,
	// 		spinnerSize: 140,
	// 		messageColor: loadingColor,
	// 		message: loadingMessage
	// 	});

	// 	// spinners: [
	// 	// 	'audio', 'ball', 'bars', 'circles', 'comment',
	// 	// 	'cube', 'dots', 'facebook', 'gears', 'grid', 'hearts',
	// 	// 	'hourglass', 'infinity', 'ios', 'mat', 'oval',
	// 	// 	'pie', 'puff', 'radio', 'rings', 'tail'
	// 	// ]

	// }

}
