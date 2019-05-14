<template>
<!-- 
	class="q-pa-xs"

	beda v-model dan value adalah
		v-model : bisa ambil nilainya (saat ketik)
		value   : tidak bisa ambil nilainya (saat ketik)


			v-model="ObjForm" 
			value="pObj.Value" 
			:stack-label="pObj.Name"  
				:max="pObj.Max === '' ? 0 : pObj.Max"
				:min="pObj.Min === '' ? 0 : pObj.Min"

			<q-input 
				v-model="ObjForm" 
				:float-label="pObj.Name" 
				:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
				@keydown="onKeyDown"
				@blur="onLostFocus"
			/>		
		Show : ({{ pObj.Show }})
  :error="ErrorObj"
  :error-label="ErrorObj === true ? ErrorLabel : ''"
 -->

<q-field v-show="pObj.Show" 
  :label="pObj.Title"
  :icon="pObj.Icon"
  :helper="pObj.Helper"
  :error="$v.ObjForm.$error"
  :error-label="ErrorLabel"
  :orientation="pObj.Orientation === '' ? 'horizontal' : pObj.Orientation"
  class="myobj"
>
	<slot name="ObjH"></slot> <!-- Slot for Object Header -->
<!--
***************************************************  
************BEGIN OBJECT TEXT
***************************************************  
												--> 
	<div v-if="pObj.Tipe=='txt'">  	
		<q-input 
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:float-label="pObj.Name" 
			:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
			:upper-case="Capital.big"
			:lower-case="Capital.small"
			:prefix="pObj.Prefix"
			:suffix="pObj.Suffix"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			@keydown="onKeyDown"
			@blur="onLostFocus"
			@input="$v.ObjForm.$touch"
		/>
	</div>
<!--
***************************************************  
************END OBJECT TEXT
***************************************************  
												-->	
<!--
***************************************************  
************BEGIN OBJECT PASSWORD
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='pwd'">  	
		<q-input
			type="password" no-pass-toggle
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:float-label="pObj.Name" 
			:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			@input="$v.ObjForm.$touch"
		/>
	</div>
<!--
***************************************************  
************END OBJECT PASSWORD
***************************************************  
  												--> 	
<!--
***************************************************  
**********BEGIN OBJECT DATETIME
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='dtp'">  	
		<q-datetime
			style="padding-bottom: 2px"
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:float-label="pObj.Name" 
			:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			@input="$v.ObjForm.$touch"
			:type="pObj.DateType"
			:format="pObj.FormatDisplay"
			class="myfont"
		/>
	</div>
<!--
***************************************************  
**********END OBJECT DATETIME
***************************************************  
  												--> 
<!--
***************************************************  
**********BEGIN OBJECT FILE
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='fle'">  
		<q-uploader
			:ref="'ref'+pObj.Code"
			:float-label="pObj.Name" 
			:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			@input="$v.ObjForm.$touch"
			:url="url" 
			hide-upload-button
			hide-upload-progress
			:extensions="pObj.Extensions"
			:multiple="pObj.Multiple"
			auto-expand
			@add="addFile"
			@remove:cancel="addFile"
			:after="[{icon: 'cloud_download', handler () { downloadFiles() }}]"
		/>
		<q-input
			v-show="false" 
			v-model="ObjForm" 
			float-label="Data Files" 
			readonly
			inverted-light
			color="grey-6"
		/>
	</div>
<!--
***************************************************  
**********END OBJECT FILE
***************************************************  
  												--> 
<!--
***************************************************  
**********BEGIN OBJECT NUMERIC
***************************************************  
  												--> 

	<div v-else-if="pObj.Tipe=='num'">  	
		<q-input 
			type="number" align="right" 
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:float-label="pObj.Name" 
			:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
			:decimals="pObj.Decimal"
			:step="pObj.Step"
			:prefix="pObj.Prefix"
			:suffix="pObj.Suffix"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			@input="$v.ObjForm.$touch"
		/>
	</div>	
<!--
***************************************************  
**********END OBJECT NUMERIC
***************************************************  
  												--> 
<!--
***************************************************  
**********BEGIN OBJECT REMARK
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='rmk'" >  	
		<q-input 
			type="textarea"
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:float-label="pObj.Name" 
			:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			:max-height="pObj.Height"
			@input="$v.ObjForm.$touch"
		/>
	</div>	
<!--
***************************************************  
**********EBD OBJECT REMARK
***************************************************  
  												--> 
<!--
***************************************************  
**********BEGIN OBJECT COMBO / SELECTION
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='cmb'" >  	
		<q-select 
			:radio="JenisSelection.radio"
			:multiple="JenisSelection.multi"
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:float-label="pObj.Name" 
			:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			:options="pObj.Options"  
			@input="$v.ObjForm.$touch"
		/>
	</div>	
<!--
***************************************************  
**********BEGIN OBJECT COMBO / SELECTION
***************************************************  
  												--> 

<!--
***************************************************  
**********BEGIN OBJECT RADIO BUTTON
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='rad'" >  
		<q-option-group 
			:type="pObj.Jenis"
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			:options="pObj.Options" 
			@input="$v.ObjForm.$touch"
		/>
	</div>
<!--
***************************************************  
**********END OBJECT RADIO BUTTON
***************************************************  
  												--> 
<!--
***************************************************  
**********BEGIN OBJECT TOOGLE
***************************************************  
**********value nya harus true or false
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='tog'" >  
		<q-toggle
			v-model="ObjForm" 
			:ref="'ref'+pObj.Code"
			:left-label="pObj.Left"
			:readonly="pObj.ReadOnly"
			:inverted-light="pObj.ReadOnly"
			:color="WarnaReadOnly"
			:label = "pObj.Name" 
			@input="$v.ObjForm.$touch"
		/>
	</div>	
<!--
***************************************************  
**********END OBJECT TOOGLE
***************************************************  
  												--> 
<!--
***************************************************  
************BEGIN OBJECT POPUP
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='pop'">  	
		<!--  
:helper="popDescription"
		-->
		<!-- <q-field> -->
			<div class="row">
				<q-input 
					clearable
					:disable="pObj.Pops[pObj.PopCode+pObj.PopDesc].Disabled"
					:before="[{icon: 'search', handler () { 
						if(!pObj.ReadOnly) { pObj.ShowPopUpModal = !pObj.ShowPopUpModal } 
					}}]"
					v-model="pObj.Pops[pObj.PopCode+pObj.PopDesc].Value" 
					:ref="'ref'+pObj.Code+'search'"
					:float-label="pObj.Name" 
					:placeholder="pObj.Description === '' ? pObj.Name : pObj.Description"
					:readonly="pObj.ReadOnly"
					:inverted-light="pObj.ReadOnly"
					:color="WarnaReadOnly"
					@focus="pObj.Pops[pObj.PopCode].Value==='' ? '' : pObj.Pops[pObj.PopCode+pObj.PopDesc].Value=pObj.Pops[pObj.PopCode].Value"
					@input="$v.ObjForm.$touch"
					@blur="popBlur"
					@keyup.enter="$refs['ref'+pObj.Code+'search'].blur()"
					class="col-12"
				>
					<q-autocomplete
						@search="popAutoComplete"
						@selected="popSelected"
						value-field="text"						
						separator
						:min-characters="pObj.SearchChar"
					/> 

				</q-input>
			</div>
			<div class="row">
				<q-input class="col-xs-2"
					v-show="false" 
					v-model="ObjForm" 
					float-label="IY" 
					:ref="'ref'+pObj.Code"
					readonly
					inverted-light
					color="grey-6"
					@input="$v.ObjForm.$touch"
				/>
				<q-input class="col-xs-4"
					v-show="false" 
					v-model="pObj.Pops[pObj.PopCode].Value" 
					float-label="Code" 
					readonly
					inverted-light
					color="grey-6"
				/>
				<q-input class="col-xs-5"
					v-show="false" 
					v-model="pObj.Pops[pObj.PopDesc].Value" 
					float-label="Description" 
					readonly
					inverted-light
					color="grey-6"
				/>
			</div>
		<!-- </q-field> -->



		<q-modal v-model="pObj.ShowPopUpModal" maximized class="q-ma-xl q-pa-xl" >
			<q-modal-layout v-if="pObj.ShowPopUpModal">

				<div class="row q-ma-md">
					<!-- <q-search
					hide-underline
					color="primary"
					v-model="popFilter"
					class="col-6"
					/> 
						<span 
							class="text-primary justify-end" 
							style="text-transform: uppercase; font-weight: bold; ">
						</span> 			

				-->
					<q-input
						class="col-xs-5 col-md-4"
						:before="[{icon: 'search', handler () { LoadDataGrid() }}]"
						placeholder="Search"
						v-model="pObj.Grid.SearchAllColumns"
						@keyup.enter="pObj.Grid.LoadDataGrid()"
					/>
					<div class="col-xs-7 col-md-8 text-primary text-right">
							{{pObj.Description}}
					</div>
				</div>

				<ObjGrid 
		            :frmID="frmID"
		            :subFrmID="'Forms.'+pFrmObj+'.'+pObj.Code+'.'"
		            frmType="popup"
            	/>
			</q-modal-layout>
		</q-modal>

	</div>
<!--
***************************************************  
************END OBJECT POPUP
***************************************************  
  												--> 
<!--
***************************************************  
************BEGIN OBJECT GRID
***************************************************  
  												--> 
	<div v-else-if="pObj.Tipe=='grd'">  	
		<!--  
:helper="popDescription"
		-->
		<ObjGrid 
			:frmID="frmID"
			:subFrmID="'Forms.'+pFrmObj+'.'+pObj.Code+'.'"
			frmType="grd"
		/>

		<q-input
			v-show="false" 
			v-model="ObjForm" 
			stack-label="Grid Detail Data" 
			:ref="'ref'+pObj.Code"
			readonly
			inverted-light
			color="grey-6"
			@input="$v.ObjForm.$touch"
		/>

		<q-modal 
			:ref="'ref'+pObj.Code+'Modal'"
			v-model="grdDetailModal"
			minimized
			no-backdrop-dismiss
			no-esc-dismiss
		>
			<q-modal-layout>
				<q-toolbar slot="header">
					<q-btn
						flat round dense
						@click="grdModalBack"
						icon="reply"
						wait-for-ripple
					/>
					<q-toolbar-title>
						{{pObj.Description}}
					</q-toolbar-title>
					<q-btn flat round dense icon="save" 
						v-show="grdMode==='6' ? false : true"
						@click="grdSave" >						 
						<q-tooltip anchor="top right" self="bottom left">
							<div v-show="grdMode==='1' ? true : false"><strong>Insert</strong></div>
							<div v-show="grdMode==='2' ? true : false"><strong>Update</strong></div>
						</q-tooltip>
					</q-btn>
				</q-toolbar>
				<div class="q-pl-sm q-pr-sm q-pb-md">
					<slot name="GridForm"></slot>
				</div>
			</q-modal-layout>
		</q-modal>
		
	</div>
<!--
***************************************************  
************END OBJECT GRID
***************************************************  
  												--> 
	<slot name="ObjF"></slot> <!-- Slot for Object Footer -->
</q-field>			
</template>

<script>

	function urltoFile(url, filename, mimeType){
		return (fetch(url)
			.then(function(res){return res.arrayBuffer();})
			.then(function(buf){return new File([buf], filename, {type:mimeType});})
		);
	}

	import weApi from 'src/api'
	import weAuth from 'src/auth';
	import { filter } from 'quasar'
	import { required, minLength, maxLength, alpha, minValue, maxValue } from 'vuelidate/lib/validators'
	import store from 'src/store'
	import ObjGrid from './ObjGrid.vue';
	import { mapGetters, mapMutations, mapActions } from 'vuex';

	export default { 
  		name: 'ObjForm',		
  		props: {
            pObj: { type : Object },
            pFrmObj: { type : String }
        },
  		components : {ObjGrid},	
		created () { 
			// BEGIN By Wilinato 2019 05 09
			// this.frmID = this.$parent.frmID;
			this.frmID = this.getAppIdFormActive('MainMenu');				
			// Tidak bisa pakai this.$parent.frmID
			// Karena untuk Form ke 2 tidak bisa dapat (Form HEADER dan DETAIL)
			// END By Wilinato 2019 05 09

			if (this.pObj.Tipe==="pop") {
				// console.log(this.pObj.Code , 'Forms.'+this.pFrmObj+'.'+this.pObj.Code+'.'+'Grid.PopSetValue');

				this.setAppForms_Data({
					id: this.frmID,
					path:'Forms.'+this.pFrmObj+'.'+this.pObj.Code+'.'+'PopSetValue',
					data: this.popSetValue});

			} else if(this.pObj.Tipe==="grd") {
				
				this.setAppForms_Data({
					id: this.frmID,
					path:'Forms.'+this.pFrmObj+'.'+this.pObj.Code+'.'+'grdAction',
					data: this.grdAction});			

				this.setAppForms_Data({
					id: this.frmID,
					path:'Forms.'+this.pFrmObj+'.'+this.pObj.Code+'.'+'grdModalBack',
					data: this.grdModalBack});			

			}
			// console.log('ObjForm created', this.pObj);
			// console.log(this.pObj.Tipe + ' : ' + this.pObj.Name , this.ObjValidation);
		},
		// mounted() { console.log('ObjForm mounted', 'Test 1222222') },	
		// beforeMount () { console.log('ObjForm beforeMount', this) },		
		// updated() { console.log('ObjForm updated', 'Test 123') },	
		// beforeUpdate () { console.log('ObjForm beforeUpdate', 'Test 456') },			
		// activated () { console.log('ObjForm activated', 'Test 456')  },		
		// deactivated () { console.log('ObjForm deactivated', 'Test 456')  },		
		// watch: { },
		computed: { 
			...mapGetters('App',['getAppForms','getAppIdFormActive']),
			ObjForm: {
				get: function() {


					// Begin Clear
					switch(this.pObj.Tipe) {
						case 'grd':
							// console.log('masuk sini Forms.'+this.pFrmObj+'.'+this.pObj.Code+'.'+'Grid.Rows.data', this.pObj);

							// console.log('this.pObj', this.pObj);
							// console.log('this.pObj.Code', this.pObj.Code);
							// console.log('this.pObj.Tipe', this.pObj.Tipe);
							// console.log('this.pObj.Grid', typeof this.pObj.Value);

							if (typeof(this.pObj.Value) == 'object') {
								// console.log('this.pObj.Value', this.pObj.Value);

								this.setAppForms_Data({
									id: this.frmID,
									path:'Forms.'+this.pFrmObj+'.'+this.pObj.Code+'.'+'Grid.Rows.data',
									data: this.pObj.Value});
							}

							break;
						case 'fle':
							if(this.pObj.Value.length === 0){
								if(typeof(this.$refs['ref'+this.pObj.Code]) != 'undefined') {
									this.$nextTick(() => {
										this.$refs['ref'+this.pObj.Code].reset();
									})
								}
							} else {
								if(this.pObj.FileValue != ''){

									if (this.pObj.FileValue == 'tempVal') {
										this.pObj.FileValue = ''
										this.pObj.Value = ''
										return
									}

									var nilai = this.pObj.FileValue;
									var me = this;

									for (let child in nilai) {
										var tipeFile = nilai[child].split(';')[0].split(':')[1];

										urltoFile(nilai[child], 'file'+(Number(child)+1)+'.adr', tipeFile)
										.then(function(file){
											var fileList = [];
											fileList.push(file);
											me.$refs['ref'+me.pObj.Code].add(fileList);
										})
									}

									this.pObj.FileValue = ''
								} 
							}
							break;
					}
					// End Clear	

					return this.pObj.Value;
				},
				set: function(newValue) {
					this.pObj.Value = newValue;
				},
			},
			WarnaReadOnly() {
				return this.pObj.ReadOnly ? 'grey-6' : 'primary';
			},
			ErrorLabel () {
				// console.log(this.ObjForm);
				// console.log(this.pObj);
				// console.log(this.$v.ObjForm.minLength);

				if(this.$v.$error) {

					if (this.pObj.Required) {
						if (!this.$v.ObjForm.required) {
							return 'This field is required.';
						}
					} 

					switch (this.pObj.Tipe) {
						case "txt":
						case "pwd":
							if (this.pObj.Min != 0) {
								if (!this.$v.ObjForm.minLength) {
									// return 'This field must have at least ' + this.pObj.Min + ' characters.';
									return 'Minimum ' + this.pObj.Min + ' characters.';
								} 
							} 
							if (this.pObj.Max != 0 ) {
								if (!this.$v.ObjForm.maxLength) {
									// return 'This field must have at most ' + this.pObj.Max + ' characters.';
									return 'Maximum ' + this.pObj.Max + ' characters.';
								}
							} 
							break;
						
						case "num":
							if (this.pObj.MinValue != 0) {
								if (!this.$v.ObjForm.minValue) {
									return 'Minimum value is ' + this.pObj.MinValue + '';
								}
							}
							if (this.pObj.MaxValue != 0)  {
								if (!this.$v.ObjForm.maxValue) {
									return 'Maximum value is ' +  this.pObj.MaxValue + '';
								}
							}	
							break;
					}

				}

				return;

			},
			ObjValidations() {
				var Val = {}
				if (this.pObj.Required) {
					Val.required = required;
				}

				switch (this.pObj.Tipe) {
					case "num":
						if (this.pObj.MinValue != 0) {
							if (this.pObj.MinValue != 0) {
								Val.minValue = minValue(this.pObj.MinValue);
							}
						}
						if (this.pObj.MaxValue != 0)  {
							if (this.pObj.MaxValue != 0) {
								Val.maxValue = maxValue(this.pObj.MaxValue);
							}
						}					
						break;					
					case "cmb":
						this.JenisSelection.radio = this.pObj.Jenis === 'RADIO' ? true : false;
						this.JenisSelection.multi = this.pObj.Jenis === 'MULTIPLE' ? true : false;				
						break;
					case "txt":
						this.Capital.big = this.pObj.Capital === 'BIG' ? true : false;
						this.Capital.small = this.pObj.Capital === 'SMALL' ? true : false;	
					case "pwd":
						if (this.pObj.Min != 0) {
							if (this.pObj.Min != 0) {
								Val.minLength = minLength(this.pObj.Min);
							}
						}
						if (this.pObj.Max != 0) {
							if (this.pObj.Max != 0) {
								Val.maxLength = maxLength(this.pObj.Max);
							}
						}				
						break;
				}
				
				return Val;

			},
		},	
		validations() {
			// console.log('validations -> '+this.ObjABC) 
			return {
				ObjForm: this.ObjValidations 
			}
		},		
		methods: {			
			...mapMutations('App',['setAppForms_Data']),
			// ...mapActions('Grid',['doGridLoadData','doGridSelection','doGridTools','doGridTools_FSClick']),	
			touch() {
				this.$v.ObjForm.$touch();
			},
		    onKeyDown(e) {
		    },
		    onLostFocus() {
				this.$emit('eObjLostFocus');
			},

/*
------------------------------------------------------------------------------------------
------------------BEGIN object File-------------------------------------------------------
------------------------------------------------------------------------------------------
																						*/
			addFile () {
				this.$nextTick(() => {
					this.ObjForm = this.$refs['ref'+this.pObj.Code].files;
				})
			},
			downloadFiles () {
				let myFile = this.ObjForm;
				let link = document.createElement('a')

				for (var k in myFile) {
					var theFile = myFile[k];

					if(typeof(theFile) != 'undefined') {
						link.href = window.URL.createObjectURL(theFile)
						link.download = theFile.name
						link.click()
					} else {
						this.$q.notify('No File Selected!');
					}
				}
			},

/*
------------------------------------------------------------------------------------------
------------------End object File---------------------------------------------------------
------------------------------------------------------------------------------------------
																						*/


/*
------------------------------------------------------------------------------------------
------------------Begin object POPUP------------------------------------------------------
------------------------------------------------------------------------------------------
																						*/

			popBlur() {
				if ( this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Disabled === true) {
					return;
				}

				if ( this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Value === 
				     this.pObj.Pops[this.pObj.PopCode].Value && 
				     this.pObj.Pops[this.pObj.PopCode].Value != "") {

					this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Value = 
									this.pObj.Pops[this.pObj.PopCode].Value + ' | ' +
									this.pObj.Pops[this.pObj.PopDesc].Value;					
					return;
				}

				if ( this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Value === "") {
					this.pObj.Value = "";
					this.pObj.Pops[this.pObj.PopCode].Value = "";
					this.pObj.Pops[this.pObj.PopDesc].Value = "";	
					return;
				}

				if ( this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Value === 
				     this.pObj.Pops[this.pObj.PopCode].Value + ' | ' +
				     this.pObj.Pops[this.pObj.PopDesc].Value ) {	
					return;
				}

				console.log('getRecord.....');

				var cari = [{ field: this.pObj.PopCode, 
							  label: "", 
							  filterOperator: '=', 
							  filterValue: this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Value
						    }];

				var params = new Object;
					params['Controller'] = 'c'+this.pObj.Controller;
					params['Method'] = this.pObj.Method;
					params['Condition'] = this.pObj.Condition;
					params['cari'] = cari;
					params['perPage'] = 0;
				this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Disabled = true;
				weApi.fnRequestData (params, '').then((response) => {

					if(response.Data.data.length != 0) {
						var Data = response.Data.data[0];
						this.popSetValue({
							flag: true, 
							iy: typeof(Data[response.Key]) === 'number' ?
								Data[response.Key] : Data[response.Key].trim(), 
							code: Data[this.pObj.PopCode].trim(), 
							desc: Data[this.pObj.PopDesc].trim(),
							data: Data
						});
					} else {
						this.popSetValue({ flag: false, iy: "", code: "", desc: "", data: {} });	
					}
					this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Disabled = false;
				}).catch(() => {
					this.$q.notify({
						color: 'negative',
						position: 'top',
						message: 'Get Record PopUp Fail',
						icon: 'report_problem'
					})
					this.pObj.Pops[this.pObj.PopCode+pObj.PopDesc].Disabled = false;
				});

			},
			popSetValue({flag, iy, code, desc, data }) {
				if (flag) {
					this.pObj.Value = iy;
					this.pObj.Pops[this.pObj.PopCode].Value = code;
					this.pObj.Pops[this.pObj.PopDesc].Value = desc;

					this.pObj.Pops[this.pObj.PopCode+this.pObj.PopDesc].Value = code + ' | ' + desc;
					this.pObj.PopData = data;	
				} else {
					this.pObj.Value = "";
					this.pObj.Pops[this.pObj.PopCode].Value = "";
					this.pObj.Pops[this.pObj.PopDesc].Value = "";					
				}
			},

			popSelected(item){		
				console.log('ObjForm - popSelected','masuk sini')
				this.popSetValue({
					flag: true, 
					iy: typeof(item.value) === 'number' ? item.value : item.value.trim(), 
					code: item.label.trim(), 
					desc: item.sublabel.trim(),
					data: item.data
				});
			},			
			popAutoComplete(terms, done) {
				
				var cari = [{ field: this.pObj.PopCode, 
							  label: "", 
							  filterOperator: 'likeRight', 
							  filterValue: terms
						    }];

				var params = new Object;
					params['Controller'] = 'c'+this.pObj.Controller;
					params['Method'] = this.pObj.Method;
					params['Condition'] = this.pObj.Condition;
					params['cari'] = cari;
					params['perPage'] = 0;

				weApi.fnRequestData (params, '').then((response) => {
					this.listData=[];
					for (let i in response.Data.data) {
						var code = response.Data.data[i][this.pObj.PopCode].trim();
						var desc = response.Data.data[i][this.pObj.PopDesc].trim();
						var label = code+' - '+desc

						this.listData.push({
							label: code , 
							sublabel: desc,
							value: typeof(response.Data.data[i][response.Key]) === 'number' ? 
									response.Data.data[i][response.Key] :
									response.Data.data[i][response.Key].trim(),
							text: code + ' | ' + desc,
							data: response.Data.data[i]
						})
					}
					done(filter(terms, {field: 'label', list: this.listData}))
				}).catch((e) => {
					this.$q.notify({
						color: 'negative',
						position: 'top',
						message: 'Get Record PopUp Fail' + e,
						icon: 'report_problem'
					});
					done([]);
				});

			},

/*
------------------------------------------------------------------------------------------
------------------End object POPUP--------------------------------------------------------
------------------------------------------------------------------------------------------
																						*/


/*
------------------------------------------------------------------------------------------
------------------Begin object GRID-------------------------------------------------------
------------------------------------------------------------------------------------------
																						*/


			grdClearForm () {
				// console.log('this.$parent',this.$parent);
				// console.log('this.frmID',this.frmID);
				// console.log('this.pObj.Code',this.pObj.Code);
				weAuth.clearFormObject({
					form: this,
					frmID: this.frmID, 
					frmObj: 'frm'+this.pObj.Code, 
					mode: this.grdMode					
				});
			},
			grdAction({mode, data}) {
				this.pObj.OpenForm = true
				this.grdMode = mode
				this.grdClearForm();
				this.$emit('eCallDetailForm', {mode:this.grdMode, data:data} );	
				switch (mode) {
					case "1":
						if(!this.pObj.OpenForm) { return }				
						this.grdDetailModal = true
						break;
					case "2":
						this.grdSelectionRow = data;
						weAuth.fillFormObjectValue({frmID: this.frmID, frmObj: 'frm'+this.pObj.Code, data:data});
						if(!this.pObj.OpenForm) { return }
						this.grdDetailModal = true
						break;
					case "3":
						this.grdSelectionRow = data;
						if(!this.pObj.OpenForm) { return }
						this.grdSave();
						break;
					case "6":
						weAuth.fillFormObjectValue({frmID: this.frmID, frmObj: 'frm'+this.pObj.Code, data:data});
						this.grdDetailModal = true
						break;
				}				
			},
			grdModalBack () {
				this.grdDetailModal = false
				this.grdMode = '5'		
				this.grdClearForm();
				this.grdMode = ''				
			},
			grdSave () {

				this.pObj.SaveForm = true
				this.$emit('eSaveDetailForm', this.grdMode);	
				if(!this.pObj.SaveForm) { return }

				if(this.grdMode === '1' || this.grdMode === '2') {
					//Begin Validation Form
					if (weAuth.validationFormObject({
							form: this, 
							frmID: this.frmID, 
							frmObj: 'frm'+this.pObj.Code
						})) {

						this.$q.notify('Please review fields again!'); 
						return;
					}
					//End Validation Form
				}

				var o = this.getAppForms[this.frmID].Forms;
				// console.log('ObjForm - grdSave - o ', o);
				var f = weAuth.getValueFormObject({o: o})['frm'+this.pObj.Code];
				var j = JSON.stringify(f);
				var Data = JSON.parse(j);
				// console.log('ObjForm - grdSave - f ', f);
				// console.log('ObjForm - grdSave - this.pObj.Value ', this.pObj.Value);
				// console.log('ObjForm - Data', Data)
				// console.log('ObjForm - Grid', Grid)
				// console.log('ObjForm - this.grdSelectionRow', this.grdSelectionRow)
				var j = JSON.stringify(this.pObj.Value);
				var Grid = JSON.parse(j);					

				if(this.grdMode === '1') { // Add
					Grid.push(Data); 		
					this.grdClearForm();
				} else if (this.grdMode === '2') { // Edit
					Grid[this.grdSelectionRow.__index] = Data;
				} else if (this.grdMode === '3') { // Delete
					Grid.splice(this.grdSelectionRow.__index,1);
				} else {
					this.$q.notify('error Save Into Grid2 ');
				}
				this.pObj.Value = Grid;

				if (this.grdMode === '2') { // Begin Untuk Update Langsung Keluar
					this.grdModalBack();
				} // End Untuk Update Langsung Keluar

			}
/*
------------------------------------------------------------------------------------------
------------------End object GRID---------------------------------------------------------
------------------------------------------------------------------------------------------
																						*/


		},			
		data () {
			return {
				MaxChar : {type: Number, default: 0},
				MinChar : {type: Number, default: 0},
				JenisSelection : { radio : false, multi : false},
				Capital : { big : false, small : false},
				url: process.env.API,
				showModal: false,
				listData : [],
				frmID: '',
				grdDetailModal: false,
				grdMode: '',
				grdSelectionRow: {},
	      	}
	    }
	}
</script>