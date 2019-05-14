<template>
  <div class="">
  <!-- 
  	v-if akan merender ulang (re-create object ulang) 
  	kalau sudah re-create
  		akan mentrigger computed dan lain sebagainya
  -->
  	<div v-show="myForm.Properties.layout==='1'">
		<ObjGrid :frmID="frmID" />
  	</div>
  	<div v-show="myForm.Properties.layout==='2'" class="text-left q-ma-xs round dense row">
  		<div class="col-xs-12 col-md-6 q-ma-xs">
			<ObjForm 
				v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
				:pObj="Obj" :pFrmObj="'frm'+frmID"
				:key="index"
				v-if="Obj.Panel === 'Panel1' ? true : false"
			/>  	
			<div class="row">
				<ObjForm class="col-xs-12 col-md-6 q-ma-xs"
					v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
					:pObj="Obj" :pFrmObj="'frm'+frmID"
					:key="index"
					v-if="Obj.Panel === 'Panel1A' ? true : false"
				/>  	
				<ObjForm class="col-xs-12 col-md-4 q-ma-xs"
					v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
					:pObj="Obj" :pFrmObj="'frm'+frmID"
					:key="index"
					v-if="Obj.Panel === 'Panel1B' ? true : false"
				/>  	
			</div>
  		</div>
  		<div class="col-xs-12 col-md-5 q-ma-xs">
			<ObjForm 
				v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
				:pObj="Obj" :pFrmObj="'frm'+frmID"
				:key="index"
				v-if="Obj.Panel === 'Panel2' ? true : false"
			/>  	
  		</div>
  		<div class="col-xs-12 col-md-11 q-ma-xs">
			<ObjForm 
				v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
				:pObj="Obj" :pFrmObj="'frm'+frmID"
				:key="index"
				@eCallDetailForm="TBLUAMshow"
				@eSaveDetailForm="TBLUAMsave"
				v-if="Obj.Panel === 'Panel5' ? true : false"
			>

					<div 
						slot="GridForm"
						:style="$q.platform.is.mobile ? 'width: 280px' : 'width: 500px'">
						<ObjForm 
							v-for="(Obj, index) in myForm.Forms['frmTBLUAM']" 
							:pObj="Obj" :pFrmObj="'frmTBLUAM'"
							:key="index"
							v-if="Obj.Panel === 'Panel11' ? true : false"
						/>  
						<ObjForm 
							v-for="(Obj, index) in myForm.Forms['frmTBLUAM']" 
							:pObj="Obj" :pFrmObj="'frmTBLUAM'"
							:key="index"
							v-show="detailFormAcess"
							v-if="Obj.Panel === 'Panel12' ? true : false"
						/>  
						<ObjForm 
							v-for="(Obj, index) in myForm.Forms['frmTBLUAM']" 
							:pObj="Obj" :pFrmObj="'frmTBLUAM'"
							:key="index"
							v-show="!detailFormAcess"
							v-if="Obj.Panel === 'Panel13' ? true : false"
						/>  												
	 				</div>	 

 		
			</ObjForm>  	
  		</div>
  		<!-- <div class="col-xs-12 col-md-5 q-ma-xs">
			<ObjForm 
				v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
				:pObj="Obj" :pFrmObj="'frm'+frmID"
				:key="index"
				v-if="Obj.Panel === 'Panel4' ? true : false"
			/>  	
  		</div> -->
  	</div>
  </div>
</template>

<script>

	import weAuth from 'src/auth';
	import weObjs from '../components/weObj/main.js';
	// import { mapGetters, mapMutations, mapActions } from 'vuex';
	import { mapGetters, mapActions } from 'vuex';
	export default { 
  		components : weObjs,	
	    created () { 
	    	weAuth.setupForm({
	    		form: this,						// --> local this
	    		formId: 'frmID',  				// --> local variabel name 
	    		CommandClick: this.CommandClick
	    	}).then(()=>{
				
				weAuth.loadFormObject({
					form: this,
					frmID: this.frmID,			
					frmObj: 'frmTBLUAM',	
					method: 'FormObjectDetail' 	
				});

	    	});
	    },
		// mounted() { console.log('TBLDSC mounted', 'Test 1222222') },	
		// beforeMount () { console.log('TBLDSC beforeMount', 'Test 22222') },		
		// updated() { console.log('TBLDSC updated', 'Test 123') },	
		// beforeUpdate () { console.log('TBLDSC beforeUpdate', 'Test 456') },			
		// activated () { console.log('TBLDSC activated', 'active') },
		// deactivated () { console.log('TBLDSC deactivated', 'active') },
		computed: {
	      	...mapGetters('App',['getAppForms']),
			myForm() {
				// console.log('Masuk myForm TBLDSC');
				return this.getAppForms[this.frmID];
				// return [];
			},			
		},	
		methods: {
			// ...mapMutations('App',['setAppForms_Data']),
			// ...mapActions('App',['doAppLoadObject']),
			...mapActions('App',['doAppCall']),
			CommandClick: function (mode) {

				if (mode != "") {

					weAuth.actionForm({
						form: this,
						frmID: this.frmID, 
						mode:mode
					});	

					switch(mode) {
					    case "1": // Add
					    	// alert('masuk sini');
					    	break;
					    case "2": // Edit
					    	weAuth.fillFormObject({
					    		form: this, 
					    		frmID: this.frmID, 
					    		frmObj: 'frm' + this.frmID, 
					    		method: ''
					    	});
					    	break;
					    case "3": // Delete
					    	weAuth.saveData({
					    		form: this, 
					    		frmID: this.frmID, 
					    		frmObj: 'frm' + this.frmID,
					    		method: ''
					    	});
					    	return;
					        break;
					    case "4": // Save
					    	// console.log('Begin Saving Data')
					    	weAuth.saveData({
					    		form: this, 
					    		frmID: this.frmID, 
					    		frmObj: 'frm' + this.frmID,
					    		method: ''
					    	})
					    	// console.log('End Saving Data')
					    	return;
					    	break;
					    case "5": // Cancel		
					        break;
					    case "6": // View
					    	weAuth.fillFormObject({
					    		form: this, 
					    		frmID: this.frmID, 
					    		frmObj: 'frm' + this.frmID, 
					    		method: ''
					    	});

					    	break;					        
					}					
				}

			},
			TBLUAMshow ({mode, data}) {

				var formDetail = this.myForm.Forms['frmTBLUSR'].TBLUAM;
				var f = this.myForm.Forms['frmTBLUAM'];

				if(mode === '1') {
					this.detailFormAcess = true
				} else if (mode === '2') {

					if (this.MenuAccess.length === 0) {
						this.MenuAccess = f.TAACES.Options;
					}

					var A = this.MenuAccess;
					var D = data.TMACES.split('');
					var H = [];

					if (D.length == 0) { // Ini untuk yang menu folder
						this.$q.notify('no access for this data!!!');
						formDetail.OpenForm = false;
					}

					for (var a in A) {  
						for (var d in D) {  
							if (A[a].value === D[d]) {
								H.push(A[a]);
							}
						}
					}
					f.TAACES.Options = H;
					this.detailFormAcess = false;

				}
			},
			TBLUAMsave (mode) {
				var formDetail = this.myForm.Forms['frmTBLUSR'].TBLUAM;
				var f = this.myForm.Forms['frmTBLUAM'];
				if(mode === '1') {
					if (f.TAUSERIY.Value ==='') {
						this.$q.notify('User harus diisi dulu!!!');						
						formDetail.SaveForm = false;
						return;
					}
					this.LoadHakAksesUser(f.TAUSERIY.Value)
					formDetail.SaveForm = false;
				} else if (mode === '2') {
					// this.detailFormAcess = true
					// this.frmSHLINE.BBDESC.ReadOnly = true
				}
			},
			async LoadHakAksesUser(TAUSERIY) {

				var GridDetail = this.myForm.Forms['frmTBLUSR'].TBLUAM;
				await weAuth.loading.loadData( this , 'Refreshing Your Data, Please Wait...', '', '', 
					async () => {
						var Saya = this;
						var params = new Object;
							params['Controller'] = 'cTBLUSR';
							params['Method'] = 'LoadTBLUAM';
							params['TUUSERIY'] = TAUSERIY;

							// console.log('this.myForm : ',this.myForm);
							// console.log('this.frmID : ',this.frmID);
						this.loading = true;
						await this.doAppCall({ 
									params: params, 
									frmID: this.frmID, 
									id: 'Forms.frmTBLUSR.TBLUAM.Grid'
								}).then( function(response) {
										Saya.loading = false;
										GridDetail.Value = response.Data.data;
										GridDetail.grdModalBack();
										// console.log('response',response);
										// console.log('GridDetail',GridDetail);
								}).catch( function(response) {
										Saya.$q.notify('Fail loading grid...' + response);
								});

					}
				);

		    },	 
		},			
		data () {
			return {
  				frmID: 'TBLDSCXXXX',
  				detailFormAcess: false,
  				MenuAccess : [],
	      	}
	    }
	}
</script>