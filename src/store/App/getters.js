/*
export function someGetter (state) {
}
*/

// export default {
//     getAppName: state => { return state.Name; },
//     getAppDescription: state => { return state.Description; },
//     getAppCopyright: state => { return state.Copyright; },
//     getAppVersion: state => { return state.Version; },
//     getAppForm: state => { return state.Form; },
// }


export function getAppName (state) {
	return state.AppName;
}

export function getAppDescription (state) { 
	return state.AppDescription; 
}

export function getAppCopyright (state) { 
	return state.AppCopyright; 
}

export function getAppVersion (state) { 
	return state.AppVersion; 
}

export function getAppUser (state) { 
	return state.AppUser; 
}

export function getAppForms (state) { 
	// console.log('getAppForms');
	return state.AppForms; 
}

export function getAppIdFormActive (state, getters) {
	return (frmID) => {
		var Selection = getters.getAppForms[frmID].Menu.mActiveForm;
		var a = getters.getAppForms[frmID].ListMenu.DataRute;		
			a = a.find( r => String(r.name) === Selection);		
			if (a) {
				return a.url.split('').reverse().join('');
			}
		return '';
	}
}

// export function getAppFormActive (state, getters) {
// 	return (frmID) => {
// 		var f = getters.getAppIdFormActive(frmID);
// 		if (f!="") {
// 			return getters.getAppForms[f];
// 		}
// 		return [];
// 	}
// }

export function getAppModules (state) { 
	return state.AppModules; 
}

