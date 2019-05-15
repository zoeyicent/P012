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
  	<div v-show="myForm.Properties.layout==='2'" class="text-left q-ma-xs round dense row">
<!--  
	Div Row {
		Row ======> {
			Object (COL), Object (COL), Object (COL), Object (COL)
			Sangat tergantung pada width COLUMN
		}
		Row ======> {
			Object (COL), Object (COL), Object (COL), 
			Object (COL), Object (COL), Object (COL)
		}
		Row ======> {
			Object (COL)
			Object (COL)
			Object (COL)
			Ini width nya full per Object
		}
	}

-->
		<!-- Begin Row 1 -->
		<ObjForm class="col-xs-5 col-md-4"
			v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
			:pObj="Obj" 
			:key="index"
			v-if="Obj.Panel === 'PanelA' ? true : false"
		/>  	
		<!-- End Row 1 -->

		<!-- Begin Row 2 -->
		<ObjForm class="col-xs-12 col-md-10 "
			v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
			:pObj="Obj" :pFrmObj="'frm'+frmID"
			:key="index"
			v-if="Obj.Panel === 'PanelB' ? true : false"
		/>  	
		<!-- End Row 2 -->

		<!-- Begin Row 3 -->
		<div class="col-xs-12 col-md-10">
			<div class="row">
				<div class="col-xs-8 col-md-8">
					<ObjForm
						v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
						:pObj="Obj" :pFrmObj="'frm'+frmID"
						:key="index"
						v-if="Obj.Panel === 'Panel1' ? true : false"
					/>  	
				</div>
				<div class="col-xs-4 col-md-4">
					<ObjForm class="row"
						v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
						:pObj="Obj" :pFrmObj="'frm'+frmID"
						:key="index"
						v-if="Obj.Panel === 'Panel2' ? true : 
							  Obj.Panel === 'Panel3' ? true : false"
					/>  	
				</div>
			</div>
		</div>
		<!-- End Row 3 -->
	
		<!-- Begin Row 4 -->
		<ObjForm class="col-xs-12 col-md-10 "
			v-for="(Obj, index) in myForm.Forms['frm'+frmID]" 
			:pObj="Obj" :pFrmObj="'frm'+frmID"
			:key="index"
			v-if="Obj.Panel === 'Panel4' ? true : false"
		/>  	 
		<!-- End Row 4 -->

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
		// mounted() { console.log('TBLMNU mounted', 'Test 1222222') },	
		// beforeMount () { console.log('TBLMNU beforeMount', 'Test 22222') },		
		// updated() { console.log('TBLMNU updated', 'Test 123') },	
		// beforeUpdate () { console.log('TBLMNU beforeUpdate', 'Test 456') },			
		// activated () { console.log('TBLMNU activated', 'active') },
		// deactivated () { console.log('TBLMNU deactivated', 'active') },
		computed: {
	      	...mapGetters('App',['getAppForms']),
			myForm() {
				console.log('Masuk myForm ' + this.frmID);
				return this.getAppForms[this.frmID];
				// return [];
			},			
		},	
		methods: {
			// ...mapMutations('App',['setAppForms_Data']),
			// ...mapActions('App',['doAppLoadObject']),
			CommandClick: function (mode) {

				if (mode != "") {

					weAuth.actionForm({
						form: this,
						frmID: this.frmID, 
						mode: mode
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
  				frmID: 'TBLMNUXXXX',
	      	}
	    }
	}
</script>