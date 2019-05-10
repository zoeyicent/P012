<template>
	<div>
	    <q-modal inline minimized no-backdrop-dismiss no-esc-dismiss 
			v-model="filterForm" v-if="filterForm">
	    	<q-modal-layout>
		        <q-toolbar slot="header">
		          <q-toolbar-title>
		            Filter
		          </q-toolbar-title>
		          <q-btn flat round dense
		            icon="clear" @click="showPopUpFilterForm('close', '')"
		          />			          
		        </q-toolbar>

				    <q-list separator >
				      <q-collapsible group="somegroup"
				      		v-for="(c, index) in (myGrid.Grid.FilterList)" 
				      		:key="index" 
				      		:opened="filterColumn === c.field ? true : false"
				      		:label="c.label" 
							:header-class="c.filterValue != '' ? 'text-secondary' : ''"
				      		dense highlight>
				        <div class="row dense">
							<q-select class="q-ma-xs"
						      color="secondary"     
						      v-model="c.filterOperator"
							  placeholder="Operator"
						      :options="myGrid.Grid.Operator"
						      hide-underline
						    />
							<q-input v-if="c.tipe=='num'"
								type="number" align="right" 
								v-model="c.filterValue" 
								@keyup.enter="showPopUpFilterForm('apply', '')"
							/>	
							<q-input v-else
								v-model="c.filterValue" 
								@keyup.enter="showPopUpFilterForm('apply', '')"
							/>			        	
				        </div>
				  	  </q-collapsible >
					</q-list>

		        <q-toolbar slot="footer">
					<q-btn-group class="full-width" outline>
						<q-btn color="primary" label="Apply" class="col-6"  
							@click="showPopUpFilterForm('apply', '')" />
						<q-btn color="primary" label="Clear All" class="col-6"
							@click="showPopUpFilterForm('clear', '')"/>
					</q-btn-group>
		        </q-toolbar>

		    </q-modal-layout>				    
	    </q-modal>


	    <q-modal inline minimized no-backdrop-dismiss no-esc-dismiss
	    	v-model="softForm" v-if="softForm" >
	    	<q-modal-layout>
		        <q-toolbar slot="header">
		          <q-toolbar-title>
		            Sort
		          </q-toolbar-title>
		          <q-btn flat round dense
		            icon="clear" @click="showPopUpSortForm('close', '')"
		          />			          
		        </q-toolbar>

		        	<div class="q-ma-md">
						<div class="row">
							<q-field dense
							  icon="sort" 
							  color="secondary"
							  orientation="horizontal" >		

							    <q-select class="q-ma-xs"
							      color="secondary"
								  multiple				      
							      v-model="sortResult"
								  placeholder="'Multiple Sort'"
							      :options="myGrid.Grid.SortList"
							      :display-value="`${sortResult.length} columns sorted`"
							      hide-underline
							    />
							</q-field>		
	          
						</div>
						<q-list dense highlight>
						  <q-item v-for="(c, index) in sortResult" :key="index">
						    <q-item-side icon="delete" @click.native="sortRemove(index)" />	
						    <q-item-main>
						      <q-item-tile label>{{ sortItems(c).label }}</q-item-tile>
						    </q-item-main>
						    <q-item-side
						    		:icon="sortItems(c).asc === true ? 'arrow_downward' : 'arrow_upward' " 
						    		@click.native = "sortItems(c).asc = !sortItems(c).asc"
						    	/>	
						  </q-item>		 			   			
						</q-list> 
		        	</div>

		        <q-toolbar slot="footer">
					<q-btn-group class="full-width" outline>
						<q-btn color="primary" label="Apply" class="col-6"  
							@click="showPopUpSortForm('apply', '')" />
						<q-btn color="primary" label="Clear All" class="col-6"
							@click="showPopUpSortForm('clear', '')"/>
					</q-btn-group>
		        </q-toolbar>

		    </q-modal-layout>	
	    </q-modal>

	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	export default { 
  		name: 'ObjGrid_O',		
  		props: {
            frmID: { type : String },
            subFrmID: { type : String },
            frmType: { type : String },
            myGrid: { type : Object },
        },
        created () { 	    			
			// console.log('masuk Object Grid OTHER ', this.frmID+' ('+this.subFrmID+')');
			this.setAppForms_Data({
				id: this.frmID,
				path: this.subFrmID+'Grid.showPopUpFilterForm',
				data: this.showPopUpFilterForm});
			this.setAppForms_Data({
				id: this.frmID,
				path: this.subFrmID+'Grid.showPopUpSortForm',
				data: this.showPopUpSortForm});
	    },
		computed: {
	      	...mapGetters('App',['getAppForms']),
		},
		methods: {
			...mapMutations('App',['setAppForms_Data']),
			showPopUpFilterForm(tipe, Col) {
				// console.log(Col);
				this.filterColumn = Col;
				if(tipe.toLowerCase() =="apply" ) {
					var fL = this.myGrid.Grid.FilterList.filter(r => r.filterValue != '');
					var Msg = '';
					for (var i in fL ) {
						if (fL[i].filterOperator == '') {
							Msg = fL[i].label + ' operator cannot be empty! ';
							break;
						}
					}
					if (Msg != '' ) {
						this.$q.notify({position:'top', message:Msg});
						return;
					}					
					this.setAppForms_Data({ 
						id: this.frmID, 
						path: this.subFrmID+'Grid.Filter', 
						data: fL });
					this.myGrid.Grid.LoadDataGrid();
				} else if(tipe.toLowerCase() =="clear" ) {
					this.setAppForms_Data({ 
						id: this.frmID, 
						path: this.subFrmID+'Grid.Filter', 
						data: [] });
					this.myGrid.Grid.LoadDataGrid();
				} 				
				this.filterForm = !this.filterForm;
			},
			sortItems(nilai) {
				return this.myGrid.Grid.SortList.find(a => a.value == nilai);
			},
			sortRemove(index) {
				this.$delete(this.sortResult, index)
			},
			showPopUpSortForm(tipe) {
				// console.log(this.softForm);

	
				if(tipe.toLowerCase() =="open" ) {

					var sR = this.myGrid.Grid.Sort;
					this.sortResult = [];
					for (var i in sR ) {
						this.sortResult.push( sR[i].name );
					}

				} else if(tipe.toLowerCase() =="apply" ) {

					var urut = [];
					for (var i in this.sortResult ) {
						var asc = this.myGrid.Grid.SortList.find(
										r => r.value === this.sortResult[i]
									).asc;
						urut.push({ 
							name : this.sortResult[i],
							direction : asc ? 'asc' : 'desc' 
						});
					}

					this.setAppForms_Data({ 
						id: this.frmID, 
						path: this.subFrmID+'Grid.Sort', 
						data: urut });
					this.myGrid.Grid.LoadDataGrid();
				} else if(tipe.toLowerCase() =="clear" ) {
					this.setAppForms_Data({ 
						id: this.frmID, 
						path: this.subFrmID+'Grid.Sort', 
						data: [] });
					this.myGrid.Grid.LoadDataGrid();
				}
				this.softForm = !this.softForm;
			},
		},			
		data () {
			return {	
		        filterForm: false,
		        filterColumn: '',

		        softForm: false,		        
		        sortResult: [],
	      	}
	    }
	    
	}
</script>

