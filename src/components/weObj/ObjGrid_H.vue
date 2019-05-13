<template>
	<q-tr :props="dataHead">		
			<!-- 
			@click.native="myGrid.Grid.showPopUpFilterForm('open', col.field)"
			@click.native="myGrid.Grid.showPopUpSortForm('open', col.field)"  
			 -->
		<q-th auto-width 
			:style="(myGrid.Grid.SearchAllColumns != '' ? 
						' text-decoration:underline; ' : '') 
					+ 
					(myGrid.Grid.Filter.find(
						r => r.field === col.name
					) ? 'font-weight:bold; font-style:italic;' : '') "
			@click.native="myGrid.Grid.showPopUpFilterForm('open', col.field)" 
			v-for="col in dataHead.cols"
			v-if="frmType === 'popup' ? col.tipe === 'act' ? false : true : true" 
			:key="col.name" 
			:props="dataHead" >
				<div v-if=" (col.tipeGrid == 'act102' ?  true : false) ">
		          <q-checkbox
		            v-model="dataHead.selected"
		            indeterminate-value="some"
		          />
				</div>
				<div v-else>
				    <span 
				    	v-if="myGrid.Grid.Sort.length === 0 ? false : true"
				    	v-show="myGrid.Grid.Sort.find(r => r.name === col.name) ? true : false"> 
				    	<q-icon :name= "myGrid.Grid.Sort.find(
				    				r => r.direction === 'desc' && r.name === col.name
				    			) ? 'arrow_upward' : 'arrow_downward'" /> 
				    </span>
				    {{ col.label }}
				</div>
		</q-th>
	</q-tr>   
</template>

<script>
	import { mapGetters } from 'vuex';
	export default { 
  		name: 'ObjGrid_H',		
  		props: {
            frmID: { type : String },
            subFrmID: { type : String },
            frmType: { type : String },
            myGrid: { type : Object },
            dataHead: {}
        },
		computed: {
	      	...mapGetters('App',['getAppForms']),
		},
		created () {			
			// console.log('masuk Object Grid HEADER ', this.frmID+' ('+this.subFrmID+')');
		}
	    
	}
</script>
