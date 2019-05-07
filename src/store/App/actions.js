/*
export function someAction (context) {
}

export async function doAppLogin ({commit, rootState, state }, {user, pass, keep}) {
}
*/

import weApi from 'src/api'
// import router from 'src/router'

export async function doAppLogin ({commit, state}, {user, pass, keep}) {
        var AppName = state.AppName;
        // console.log(AppName);

        // var params = new Object;
        //     params['Controller'] = 'cAUTH'; 
        //     params['Method'] = 'Login'; 
        //     params['TUUSER'] = user;
        //     params['TUPSWD'] = pass;
        //     params['EXPDAY'] = keep;
        //     params['AppName'] = AppName;
		var params = {
	        Controller : 'cAUTH', 
	        Method : 'Login', 
	        TUUSER : user,
	        TUPSWD : pass,
	        EXPDAY : keep,
	        AppName : AppName,
		}

        const Hasil = await weApi.fnLoginData (params, '');   
        if (Hasil.success) {
            localStorage.setItem(AppName+'-name',user);
            localStorage.setItem(AppName+'-token',Hasil.token);
            localStorage.setItem(AppName+'-dateInfo',Hasil.dateInfo);                
        } else {    
	        localStorage.removeItem(AppName+'-name');
	        localStorage.removeItem(AppName+'-token');
	        localStorage.removeItem(AppName+'-dateInfo');
        }

        commit('setAppDefault', {});
        commit('setAppUser', {
        		flag: Hasil.success, 
                message: Hasil.message, 
                userName: localStorage.getItem(AppName+'-name')
        }); 
}



export async function doAppCheckLogin ({commit, state}) {
    var AppName = state.AppName;
    var flag = false;
    var message = '';
    var userName = '';

    if (!localStorage.getItem(AppName+'-name')) {
    	flag = false; userName = '';
    	message = '';
    } else {

        var params = new Object;
            params['Controller'] = 'cAUTH'; 
            params['Method'] = 'CheckLogin'; 

        const Hasil = await weApi.fnRequestData (params, '');
        // console.log('actions.doAppCheckLogin',Hasil)
        if (Hasil.success) {
        	flag = Hasil.success;
        	message = 'You are still login now';
        	userName = localStorage.getItem(AppName+'-name');
        } else {  
        	flag = false; userName = '';
            message = 'Check Login Fail!!!';   
        }

	}

	if (flag===false) {
        localStorage.removeItem(AppName+'-name');
        localStorage.removeItem(AppName+'-token');
        localStorage.removeItem(AppName+'-dateInfo');
	}
    commit('setAppUser', {
    		flag: flag, 
            message: message, 
            userName: userName
    });

}


export async function doAppLogout ({commit, state}) {
    var AppName = state.AppName;

    localStorage.removeItem(AppName+'-name');
    localStorage.removeItem(AppName+'-token');
    localStorage.removeItem(AppName+'-dateInfo');

    commit('setAppDefault', {});

}



export async function doAppMenuTree ({commit, state}, formID) {
    var AppName = state.AppName;
    var params = new Object;
        params['Controller'] = 'cAUTH';
        params['Method'] = 'LoadUserTreeMenu';
        params['Username'] = localStorage.getItem(AppName+'-name');

    const Data = await weApi.fnRequestData (params, '');
    // console.log('action.doAppMenuTree', Data);

    if (Data.DataRute === undefined) {
        return false;
    }

    const DataRute = [];
    var i = 0
    for(i=0;i<Data.DataRute.length;i++) {
        try {
            DataRute.push ({
              path: '' + Data.DataRute[i].menu,
              name: Data.DataRute[i].name,
              shortCut: Data.DataRute[i].shortCut,
              url: Data.DataRute[i].url.split('').reverse().join(''),
              // component: require('layouts/Versi1/' + Data.DataRute[i].path + '.vue').default 
              component: require('pages/' + Data.DataRute[i].path + '.vue').default 
            })  
        }
        catch (e) {
            DataRute.push ({
              path: '' + Data.DataRute[i].menu,
              name: Data.DataRute[i].name,
              shortCut: Data.DataRute[i].shortCut,
              url: Data.DataRute[i].url.split('').reverse().join(''),
              component: require('pages/Error404.vue').default 
              // component: () =>import('pages/404.vue')
            })                                  
        }
    }
    DataRute.push ({ path: '*', component: require('pages/Error404.vue').default })   

    const Hasil = {DataTree: Data.DataTree, 
                   DataRute: DataRute };

    commit('setAppForms_Data', {        	
		id: formID,
		path:'ListMenu',
		data: Hasil
    });   
    // console.log('actions-doAppMenuTree ', Hasil);
    return true;

}


export async function doAppMenuAction ({commit, state}, {frmID, mode}) {
    var AppName = state.AppName;
    var form = state.AppForms[frmID];
    if (mode != "") {
        var JudulAction = '';
        var Layout = '1';
        var FlagTombol = true;
        switch(mode) {
            case "1": // Add
                JudulAction = "Add Mode";
                Layout = '2';
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.A.show', data: false }); 
                commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.E.show', data: false }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Save.show', data: true }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Cancel.show', data: true }); 
                break;
            case "2": // Edit
                JudulAction = "Edit Mode";
                Layout = '2';
                commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.A.show', data: false }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.E.show', data: false }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Save.show', data: true }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Cancel.show', data: true }); 
                break;
            case "3": // Delete
                commit('setAppForms_Data', { id: frmID, path:'Properties.modeAction', data: mode }); 
            	return;
                break;
            case "4": // Save
            	return;
            	break;
            case "5": // View
                Layout = '1';
	    		commit('setAppForms_Data', { 
	    			id: frmID, path:'Properties.tombol.A.show', 
	    			data: form.Properties.tombol.A.has }); 
	    		commit('setAppForms_Data', { 
	    			id: frmID, path:'Properties.tombol.E.show', 
	    			data: form.Properties.tombol.E.has }); 
                commit('setAppForms_Data', { 
                    id: frmID, path:'Properties.tombol.D.show', 
                    data: form.Properties.tombol.D.has }); 
	    		commit('setAppForms_Data', { 
	    			id: frmID, path:'Properties.tombol.V.show', 
	    			data: form.Properties.tombol.V.has }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Save.show', data: false }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Cancel.show', data: false }); 	    		
                break;
            case "6": // View Data
                JudulAction = "View Mode";
                Layout = '2';
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.A.show', data: false }); 
                commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.E.show', data: false }); 
                commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.D.show', data: false }); 
                commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.V.show', data: false }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Save.show', data: true }); 
	    		commit('setAppForms_Data', { id: frmID, path:'Properties.tombol.Cancel.show', data: true }); 
                break;
            case "7": // Confirm/Approved
            	return;
                break;
            case "8": // Print
                return;
                break;
            case "9": // Export To Excel
                return;
                break;
            default: // 
            	return
                break;
        }

		commit('setAppForms_Data', { id: frmID, path:'Properties.modeAction', data: mode }); 
	    commit('setAppForms_Data', { id: frmID, path:'Properties.layout', data: Layout }); 
	    commit('setAppForms_Data', { id: frmID, path:'Properties.titleAction', data: JudulAction }); 

	    /*
			Note :
				Waktu Delete / Confirm / Export to Excel / Print
				Harus Set modeAction balik ke 5
            Example : 
                this.doAppMenuAction({
                    frmID: this.frmID,  // TBLMNU
                    mode:mode           // 1        (depend on the button)
                });
	    */
    }

}   



export async function doAppLoadGrid ({commit, state}, {params, frmID, id}) {
/*
	Hati-hati pakai v-if
	karena bisa mentrigger ini berubah!!!
*/
    const Hasil = await weApi.fnRequestData (params, '');

    if(typeof(Hasil.success) != 'undefined') {
        return Hasil;
    }

    if (state.AppForms[frmID].Grid.Columns === undefined) {
        /*
            Untuk menghandle FIRST TIME
            next don't need to load, otherwise will be reset VisibleColumns Value
        */        
        // Begin Visible Columns
        var dataVisibleColumns = Hasil.Column.filter(r => r.tampil === true);
        var VisibleColumns = [];
        for (var i in dataVisibleColumns ) {
            VisibleColumns.push( dataVisibleColumns[i].field );
        }
        commit('setAppForms_Data', {id: frmID, path:id + '.VisibleColumns', data: VisibleColumns});    
        // End Visible Columns
    }

    commit('setAppForms_Data', {id: frmID, path:id + '.Rows', data: Hasil.Data});
    commit('setAppForms_Data', {id: frmID, path:id + '.Columns', data: Hasil.Column});

    var c = Hasil.Column.filter(r => r.tipe != 'act');

    // Begin Sorting
	var sortData = [];
	for (var i in c ) {
		var urut = Hasil.Sort.find(r => r.name === c[i].field);
		var asc = false;
		if ( typeof(urut) === 'object' ) {
			asc = urut.direction === 'asc' ? true : false						
		}
		sortData.push({ 
			label:c[i].label, 
			value:c[i].field, 
			asc: asc
		});
	}					    
    commit('setAppForms_Data', {id: frmID, path:id + '.SortList', data: sortData}); 
    commit('setAppForms_Data', {id: frmID, path:id + '.Sort', data: Hasil.Sort}); 
    // End Sorting

    // Begin Filter
    var filterData = [];
    for (var i in c ) {
        var cari = Hasil.Filter.find(r => r.field === c[i].field);
        filterData.push({ 
            field: c[i].field, 
            label: c[i].label, 
            tipe: c[i].tipe, 
            filterOperator: typeof(cari) === 'object' ? cari.filterOperator : 'like', 
            filterValue: typeof(cari) === 'object' ? cari.filterValue : ''
        });
    }    
    commit('setAppForms_Data', {id: frmID, path:id + '.FilterList', data: filterData}); 
    commit('setAppForms_Data', {id: frmID, path:id + '.Filter', data: Hasil.Filter}); 
    // End Filter

    commit('setAppForms_Data', {id: frmID, path:id + '.Keys', data: Hasil.Key}); 

    // console.log('Action - doAppLoadGrid ', Hasil);

    // Begin Pagination
    commit('setAppForms_Data', {
            id: frmID, 
            path: id + '.Pagination.page', 
            data: Hasil.Data.current_page });    
    // commit('setAppForms_Data', {
    // 		id: frmID, 
    // 		path: id + '.Pagination.rowsPerPage', 
    // 		data: Hasil.Data.total === Hasil.Data.per_page ? 0 : Hasil.Data.per_page });
    commit('setAppForms_Data', {id: frmID, path:id + '.Pagination.rowsNumber', data: Hasil.Data.total});    
    // End Pagination

}


export async function doAppLoadObject ({commit, state}, {frmID, frmObj, method}) {
    var params = new Object;
        params['Controller'] = 'c' + frmID;
        params['Method'] = method;

    const Hasil = await weApi.fnRequestData (params, '');
    // console.log('Actions - doAppLoadObject', Hasil)
    commit('setAppForms_Data', {
            id: frmID, 
            path: 'Forms.' + frmObj, 
            data: Hasil});    
    // console.log('Actions - doAppLoadObject ', Hasil);
    /*
    Example :
            this.doAppLoadObject({
                frmID: this.frmID,            // TBLMNU     (this is your form)
                frmObj: 'frm' + this.frmID,   // frmTBLMNU  (name your object)
                method: 'ObjectData'          // ObjectData (Depend on your laravel)
            });
    */

}  


export async function doAppFillObject ({commit, state}, {frmID, frmObj, method, mode, dataParams}) {
    var params = new Object;
        params = dataParams;
        params['Controller'] = 'c' + frmID;
        params['Method'] = method === '' ? 'FillForm' : method;
    const Hasil = await weApi.fnRequestData (params, '');
    
    if (!Hasil.success) {
        /*
            ini untuk menghandle TOKEN EXPIRED
        */
        return Hasil;
    }

    var Data = Hasil.data;
    var f = state.AppForms[frmID].Forms[frmObj];
    for (var k in f) {
        var o = f[k];
        var Nilai = Data[k] == null ? '' : Data[k];
        if (typeof(Nilai) === "string") {
            Nilai = Nilai.trim();
        }
        // console.log('Object : ', k + (o.Tipe))

        switch (o.Tipe) {
            case "num":
                o.Value = Nilai; 
                break;
            case "cmb":
            case "rad":
                if (o.Jenis === 'toggle' || o.Jenis === 'MULTIPLE') {
                    if (Array.isArray(Nilai)) {
                        o.Value = Nilai; 
                    } else {
                        o.Value = Nilai.split(''); 
                    }
                } else {
                    o.Value = String(Nilai); 
                }
                break;  
            case "dtp":
                var Nilai = Nilai;
                if (Nilai=="") {
                    o.Value = "";
                } else {
                    o.Value = Nilai.slice(0,4)+'-'+Nilai.slice(4,6)+'-'+Nilai.slice(6,8);
                }
                break;
            case "pop":
                // o.Pops[o.PopCode].Value = Data[o.PopCode] == null ? '' : Data[o.PopCode].trim();
                // o.Pops[o.PopDesc].Value = Data[o.PopDesc] == null ? '' : Data[o.PopDesc].trim();
                // o.Value = Nilai.trim();
                o.PopSetValue({
                    flag: true, 
                    iy: typeof(Nilai) === 'number' ? Nilai : Nilai.trim(), 
                    code: Data[o.PopCode] == null ? '' : Data[o.PopCode].trim(), 
                    desc: Data[o.PopDesc] == null ? '' : Data[o.PopDesc].trim(),
                    data: {}                   
                });
                break;
            case "fle":
                o.Value = 'tempVal';
                o.FileValue = Nilai.length == 0 ? 'tempVal' : Nilai;
                break;
            default:
                o.Value = Nilai; 
                break;
        }
        // console.log(k, ' (' + o.Value + ')');

        commit('setAppForms_Data', {
                id: frmID, 
                path: 'Forms.' + frmObj + '.' + k + '.Value', 
                data: o.Value});   

    } // End Looping Object


    /*
        return Hasil; 
        ini untuk menghandle Fill Form Tidak Bisa
    */
    return Hasil;

    // commit('setAppForms_Data', {
    //         id: frmID, 
    //         path: 'Forms.' + frmObj, 
    //         data: Hasil});    

}  


export async function doAppSaveData ({commit, state}, {frmID, method, mode, dataParams}) {
    var params = new Object;
        params = dataParams;
        params['Mode'] = mode;        
        params['Controller'] = 'c' + frmID;
        params['Method'] = method === '' ? 'SaveData' : method;

    const Hasil = await weApi.fnPostData (params, '');
    // console.log('Actions - doAppSaveData ', Hasil)
    return Hasil;


}  
