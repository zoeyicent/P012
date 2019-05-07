import Vue from 'vue'
/*
export function someMutation (state) {
}
*/


export function setAppDefault (state, params) {
 	state.AppUser = {};   
 	state.AppForms = {};   
 	state.AppModules = {};   
 	/*
		Ambil dari state aja;
 	*/
}

export function setAppForms (state, params) {

 	if (params === '') {
		console.log('setAppForms', 'id tidak boleh kosong');
		return;
	}

    if (state.AppForms[params]) {
        Vue.delete(state.AppForms, params); // ini ada/tidak tetap bisa COMPUTED n VUE Store
    } 

    Vue.set(state.AppForms, params, {} );    
    // console.log('mutations-setAppForms ', params);
}

export function setAppForms_Data (state, {id, path, data}) {

	if (id === '') {
		console.log('setAppForms_Data', 'id tidak boleh kosong');
		return;
	}

	if (path === '') {
		console.log('setAppForms_Data', 'path tidak boleh kosong');
		return;
	}

    var i;
    var vPath = path.split('.');    
    var vObject = state.AppForms[id]; var vKey = "";

    for (i = 0; i < vPath.length - 1; i++) {
		vObject = vObject[vPath[i]];
    }
	vKey = vPath[i];

    if (vObject) {
        Vue.delete(vObject, vKey); // ini ada/tidak tetap bisa COMPUTED n VUE Store
    } 
 
    Vue.set(vObject, vKey, data );
    // console.log('mutations-setAppForms_Data ', data);

    /*
	Example : 

		this.setAppForms_Data({
			id:'FrmMITWHL',
			path:'Obj.MWREMK.name',
			data:'ABCDEFFFFF'});

		=======================================================================
		=======================================================================
		=======================================================================

		var Data = {
			MWWHLO : {id:'MWWHLO', name: 'Warehouse Code' },
			MWWHNM : {id:'MWWHNM', name: 'Warehouse Name' },
			MWDPFG : {id:'MWDPFG', name: 'Warehouse Display' },
			MWREMK : {id:'MWREMK', name: 'Warehouse Remark' },
		}

		this.setAppForms_Data({
			id:'FrmMITWHL',
			path:'Obj',
			data: Data});
	*/
    
    
}

export function setAppUser (state, params) {
 	state.AppUser = params;   
    // console.log('mutations-setAppUser ', params);
}



export function setAppModules (state, {id, params}) {

 	if (id === '') {
		console.log('setAppModules', 'id tidak boleh kosong');
		return;
	}

    if (state.AppModules[id]) {
        Vue.delete(state.AppModules, id); // ini ada/tidak tetap bisa COMPUTED n VUE Store
    } 

    Vue.set(state.AppModules, id, params );    
    // console.log('mutations-setAppModules ', params);
}
