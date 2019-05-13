<template>
	<div>
		<div v-if="getAppForms[frmID] === undefined ? false : 
				   getAppForms[frmID].Properties.layout==='1'">		

		    <q-list separator
		    	v-if="getAppForms[frmID].Grid === undefined ? false : 
		    		  getAppForms[frmID].Grid.Columns === undefined ? false : true">

					<q-btn-group class="full-width q-pa-sm" outline >
						<q-btn 
							:color="getAppForms[frmID].Grid.Sort.length == 0 ? 'primary' : 'secondary'" 
							icon="sort" label="Sort" class="col-6" 
							@click="getAppForms[frmID].Grid.showPopUpSortForm('open', '')"/>
						<q-btn 
							:color="getAppForms[frmID].Grid.Filter.length == 0 ? 'primary' : 'secondary'" 
							icon="notes" label="Filter" class="col-6" 
							@click="getAppForms[frmID].Grid.showPopUpFilterForm('open', '')" />
					</q-btn-group>

		    		<div class="full-width q-pa-sm row bg-amber" >
						<q-btn outline
						  round dense size="sm" icon="refresh" color="primary"
						  @click="getAppForms[frmID].Grid.LoadDataGrid()"
						/>	
						<span class="q-mr-sm q-ml-sm">
							Page
						</span>							
						<q-field orientation="horizontal" class="col-5">
							<q-input
								type="number" align="right"
								v-model="getAppForms[frmID].Grid.Rows.current_page" 
								style="padding-bottom:8px;"
								:suffix="'/ ' + getAppForms[frmID].Grid.Rows.last_page"
								@keyup.enter="GoPage()"

							/>						
						</q-field>

				        <q-btn outline
				          round dense size="sm" icon="chevron_left" color="primary" class="q-mr-sm q-ml-sm"
	          			  :disable="getAppForms[frmID].Grid.Rows.current_page == 1 ? true : false"
						  @click="PreviousPage()"
				          
				        />
				        <q-btn outline
				          round dense size="sm" icon="chevron_right" color="primary"
	          			  :disable="getAppForms[frmID].Grid.Rows.current_page === getAppForms[frmID].Grid.Rows.last_page ? 
	          			  				true : false"
						  @click="NextPage()"
				        />

		    		</div>

					<q-field class="q-pa-sm" orientation="vertical" >	
						<q-input 
							v-model="getAppForms[frmID].Grid.SearchAllColumns" 
							:float-label="searchAllColumns" 
							placeholder="Enter to search"
							@keyup.enter="getAppForms[frmID].Grid.LoadDataGrid()"
						/>
					</q-field>

		    		<q-collapsible indent icon="view_column" label="Visible Column" class="full-width" opened>
						<q-field  
							orientation="vertical" 
							helper="Pick a column to show/hide ">	

							<q-option-group 
								type="toggle"
								v-model="VisibleColumns" 
								:options="getAppForms[frmID].Grid.Columns.filter(r => r.required === false)" 
							/>

						</q-field>
					</q-collapsible>

		    		<q-collapsible indent icon="table_chart" label="Layout Grid" class="full-width" >			    	
						<q-field
							orientation="vertical" 
							helper="Pick one of them to layout the grid">			  
							<q-option-group 
								type="radio"
								v-model="Seperator" 
								:options="getAppForms[frmID].Grid.Seperator.Data" 
							/>

						</q-field>
					</q-collapsible>

			</q-list>

		</div>

<!-- **************************************************************************************************************** -->
<!-- **************************************************************************************************************** -->
<!-- **************************************************************************************************************** -->

		<div v-if="getAppForms[frmID] === undefined ? false : 
				   getAppForms[frmID].Properties.layout==='2'">		
			<div>
			    <q-list link separator>

        			<q-list-header>Record controller</q-list-header>
			    	<q-item>
						<q-field          			
							icon="computer" icon-color="amber"
							orientation="vertical" 
							:label = "formActive_Record.RGID"
							helper="Register By & Date">	
							<q-input 
								v-model="formActive_Record.RGDT" 
								:before="[{icon: 'access_time', handler () {}}]"
								readonly inverted 
							/>

						</q-field>
				    </q-item>
				    <q-item>
						<q-field  
							icon="create" icon-color="amber"
							orientation="vertical"
							:label = "formActive_Record.CHID"
							helper="Change By & Date">	
							<q-input 
								v-model="formActive_Record.CHDT"
								:before="[{icon: 'access_time', handler () {}}]"
								readonly inverted
							/>

						</q-field>
				    </q-item>
				    <q-item>
						<q-field  
							icon="track_changes" icon-color="amber"
							orientation="vertical"
							:label = "formActive_Record.CSID"
							helper="Change System By & Date">
							<q-input 
								v-model="formActive_Record.CSDT" 
								:before="[{icon: 'access_time', handler () {}}]"
								readonly inverted
							/>

						</q-field>
				    </q-item>
				</q-list>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	import weAuth from 'src/auth';

	export default { 
		name: 'MenuEast',	
  		props: {
            frmID: { type : String }
        },
		created() {			
		},
		mounted() {
		},
		// beforeMount () { console.log('MainMenu beforeMount', 'Deskripsikan disini') },	
		computed: {	
			...mapGetters('App',['getAppForms']),
			searchAllColumns() {
				if (this.getAppForms[this.frmID].Grid.SearchAllColumns === '' ) {
					return "Search All columns " 	
				}
				return "Search All columns : \"" + 
							this.getAppForms[this.frmID].Grid.SearchAllColumns + "\""

			},
			Seperator: {
				get: function () {
					return this.getAppForms[this.frmID].Grid === undefined ? '' : 
							this.getAppForms[this.frmID].Grid.Seperator.Value;
				},
				set: function (NewValue) {					
					this.setAppForms_Data({
						id: this.frmID, path:'Grid.Seperator.Value', data: NewValue });
				}
			},
			VisibleColumns: {
				get: function () {
					return this.getAppForms[this.frmID].Grid === undefined ? [] : 
							this.getAppForms[this.frmID].Grid.VisibleColumns;
				},
				set: function (NewValue) {					
					this.setAppForms_Data({
						id: this.frmID, path:'Grid.VisibleColumns', data: NewValue });
				}
			},
			formActive_Record() {

		  		var fO = this.getAppForms[this.frmID].Forms['frm'+this.frmID] ;		  		
		  		if (typeof(fO) === 'undefined') {
		  			return [];
		  		}
		  		var a = new Object;
		  		for (var r in fO) {
					switch (r.substr(-4).toUpperCase()) {
						case "RGID":
						case "RGDT":
						case "CHID":
						case "CHDT":
						case "CHNO":
						case "CSID":
						case "CSDT":
		  					a[r.substr(-4).toUpperCase()] = fO[r].Value;
							break;
		  			}
		  		}
		  		return a;
			},	
		},	
		methods: {
			...mapMutations('App',['setAppForms_Data']),
			GoPage() {
				var lastPage = this.getAppForms[this.frmID].Grid.Rows.last_page; 
				var currentPage = this.getAppForms[this.frmID].Grid.Rows.current_page; 
					currentPage = currentPage > lastPage ? lastPage :
								  currentPage < 1 ? 1 : currentPage;

				this.setAppForms_Data({
					id: this.frmID,
					path: 'Grid.Pagination.page',
					data: currentPage });
				this.getAppForms[this.frmID].Grid.LoadDataGrid();

			},
			NextPage() {
				var lastPage = this.getAppForms[this.frmID].Grid.Rows.last_page; 
				var currentPage = this.getAppForms[this.frmID].Grid.Rows.current_page;
				this.setAppForms_Data({
					id: this.frmID,
					path: 'Grid.Pagination.page',
					data: (currentPage) >= lastPage ? lastPage : (currentPage+1) });
				this.getAppForms[this.frmID].Grid.LoadDataGrid();
			},
			PreviousPage() {
				var currentPage = this.getAppForms[this.frmID].Grid.Rows.current_page;
				this.setAppForms_Data({
					id: this.frmID,
					path: 'Grid.Pagination.page',
					data: (currentPage) <= 1 ? 1 : (currentPage-1) });
				this.getAppForms[this.frmID].Grid.LoadDataGrid();
			}
		},			
		data () {
			return {
			}
		},
	}
</script>


