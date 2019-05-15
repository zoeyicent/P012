<template>
  <div class="docs-table">
  <!-- 
  	v-if akan merender ulang (re-create object ulang) 
  	kalau sudah re-create
  		akan mentrigger computed dan lain sebagainya
  -->
  	<div v-show="myForm.Properties.layout==='1'">
		<ObjGrid :frmID="frmID" />
  	</div>
  	<div v-show="myForm.Properties.layout==='2'" class="text-left q-ma-md round dense row">
		<ObjForm 
			class="col-xs-5"
			v-for="(Obj, index, i) in myForm.Forms['frm'+frmID]" 
			:pObj="Obj" :pFrmObj="'frm'+frmID"
			:key="index"
			v-if="Obj.Panel === 'Panel01' ? true : false"
		/>    		
  		<div class="col-xs-12">
  			<div class="row">
				<ObjForm 
					v-for="(Obj, index, i) in myForm.Forms['frm'+frmID]" 
					:pObj="Obj" :pFrmObj="'frm'+frmID"
					:key="index"
					:class="index === 'TSSYCD' ? ['col-xs-3'] : ['col-xs-7']"
					v-if="Obj.Panel === 'Panel03' ? true : false"
				/>
			</div>
  		</div>  		
		<ObjForm 
			:class="(i % 2) != 0 ? 'col-xs-3' : 'col-xs-7'"
			v-for="(Obj, index, i) in myForm.Forms['frm'+frmID]" 
			:pObj="Obj" :pFrmObj="'frm'+frmID"
			:key="index"
			v-if="Obj.Panel === 'Panel05' ? true : false"
		/>  	
		<ObjForm 
			class="col-xs-12 col-md-10"
			v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
			:pObj="Obj" :pFrmObj="'frm'+frmID"
			:key="index"
			v-if="Obj.Panel === 'Panel10' ? true : false"
		/>  	

  	</div>
  </div>
</template>

<script>

	import weAuth from 'src/auth';
	import weObjs from '../components/weObj/main.js';
	// import { mapGetters, mapMutations, mapActions } from 'vuex';
	import { mapGetters } from 'vuex';
	export default { 
  		components : weObjs,	
	    created () { 
	    	weAuth.setupForm({
	    		form: this,						// --> local this
	    		formId: 'frmID',  				// --> local variabel name 
	    		CommandClick: this.CommandClick
	    	});
	    },
		// mounted() { console.log('TBLSYS mounted', 'Test 1222222') },	
		// beforeMount () { console.log('TBLSYS beforeMount', 'Test 22222') },		
		// updated() { console.log('TBLSYS updated', 'Test 123') },	
		// beforeUpdate () { console.log('TBLSYS beforeUpdate', 'Test 456') },			
		// activated () { console.log('TBLSYS activated', 'active') },
		// deactivated () { console.log('TBLSYS deactivated', 'active') },
		computed: {
	      	...mapGetters('App',['getAppForms']),
			myForm() {
				console.log('Masuk myForm ' + this.frmID);
				return this.getAppForms[this.frmID];
				// return [];
			},			
		},
		watch: {
			'myForm.Forms.frmTBLSYS.TSDSCD.PopData': function (data) {
				if (data.TDLGTH != undefined) {
					this.myForm.Forms['frm'+this.frmID].TDLGTH.Value = Number(data.TDLGTH);					
				}
			},
			'myForm.Forms.frmTBLSYS.TDLGTH.Value': function (data) {
				if (data != 0) {
					this.myForm.Forms['frm'+this.frmID].TSSYCD.Min = 1;
					this.myForm.Forms['frm'+this.frmID].TSSYCD.Max = Number(data);					
				}
			}
		},
		methods: {
			// ...mapMutations('App',['setAppForms_Data']),
			// ...mapActions('App',['doAppLoadObject']),
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

			}
		},			
		data () {
			return {
  				frmID: 'TBLSYSXXXX',
	      	}
	    }
	}
</script>