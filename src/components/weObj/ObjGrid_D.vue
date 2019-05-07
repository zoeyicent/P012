<template slot="body" slot-scope="props">
	<q-tr :props="dataDetail" 
		:class="frmType === 'popup' ? 'cursor-pointer transition-generic' : ''" 
		@click.native="RowClick(dataDetail.row)"	>
		<q-td v-for="col in dataDetail.cols" 
				:key="col.name" 
				v-if="frmType === 'popup' ? col.tipe === 'act' ? false : true : true" 
				:props="dataDetail">
				
			<div v-if=" (col.tipeGrid == 'act' ?  true : false) " style="max-width: 0px">
				<q-btn round dense outline icon="receipt" color="primary" >
				  <q-popover>
		            <q-list link separator class="scroll" style="min-width: 100px">
	              
		              <q-item v-show="getAppForms[frmID].Properties.tombol.E.show" 
		              	v-if="!getAppForms[frmID].Properties.tombol.E.disabled" v-close-overlay
		              	@click.native="CommandClick ('2', 'VAEDXLP', dataDetail.row)">
		                <q-item-main label="EDIT"/>
		                <q-item-side right icon="edit" color="primary"/>
		              </q-item>
		              <q-item v-show="getAppForms[frmID].Properties.tombol.E.show"
		              	v-else-if="getAppForms[frmID].Properties.tombol.E.disabled" disabled >
		                <q-item-main label="EDIT"/>
		                <q-item-side right icon="edit"/>
		              </q-item>

		              <q-item v-show="getAppForms[frmID].Properties.tombol.D.show" 
		              	v-if="!getAppForms[frmID].Properties.tombol.D.disabled" v-close-overlay
		              	@click.native="CommandClick ('3', 'VAEDXLP', dataDetail.row)">
		                <q-item-main label="DELETE"/>
		                <q-item-side right icon="delete" color="primary"/>
		              </q-item>
		              <q-item v-show="getAppForms[frmID].Properties.tombol.D.show"
		              	v-else-if="getAppForms[frmID].Properties.tombol.D.disabled" disabled >
		                <q-item-main label="DELETE"/>
		                <q-item-side right icon="delete"/>
		              </q-item>

		              <q-item v-show="getAppForms[frmID].Properties.tombol.V.show" 
		              	v-if="!getAppForms[frmID].Properties.tombol.V.disabled" v-close-overlay
		              	@click.native="CommandClick ('6', 'VAEDXLP', dataDetail.row)">
		                <q-item-main label="VIEW DATA"/>
		                <q-item-side right icon="assignment" color="primary"/>
		              </q-item>
		              <q-item v-show="getAppForms[frmID].Properties.tombol.V.show"
		              	v-else-if="getAppForms[frmID].Properties.tombol.V.disabled" disabled >
		                <q-item-main label="VIEW DATA"/>
		                <q-item-side right icon="assignment"/>
		              </q-item>

		              <q-item v-show="getAppForms[frmID].Properties.tombol.P.show" 
		              	v-if="!getAppForms[frmID].Properties.tombol.P.disabled" v-close-overlay
		              	@click.native="CommandClick ('9', 'VAEDXLP', dataDetail.row)">
		                <q-item-main label="Print"/>
		                <q-item-side right icon="print" color="primary"/>
		              </q-item>
		              <q-item v-show="getAppForms[frmID].Properties.tombol.P.show"
		              	v-else-if="getAppForms[frmID].Properties.tombol.P.disabled" disabled >
		                <q-item-main label="Print"/>
		                <q-item-side right icon="print"/>
		              </q-item>

		            </q-list>					  
				  </q-popover>
				</q-btn>
			 
<!-- 

-->
			</div>

			<div v-else-if="(col.tipeGrid == 'act001' ?  true : false)">
				<q-btn icon="print" color="primary" round dense outline 
					v-if="getAppForms[frmID].Properties.tombol.P.show"
					@click="CommandClick ('9', '', dataDetail.row)"
					:disabled="getAppForms[frmID].Properties.tombol.P.disabled" />
				<q-btn icon="assignment" color="primary" round dense outline 
					v-if="getAppForms[frmID].Properties.tombol.V.show"
					@click="CommandClick ('6', '', dataDetail.row)"
					:disabled="getAppForms[frmID].Properties.tombol.V.disabled" />
				<q-btn icon="edit" color="primary" round dense outline 
					v-if="getAppForms[frmID].Properties.tombol.E.show"
					@click="CommandClick ('2', '', dataDetail.row)"
					:disabled="getAppForms[frmID].Properties.tombol.E.disabled" />
				<q-btn icon="delete" color="primary" round dense outline 
					v-if="getAppForms[frmID].Properties.tombol.D.show"
					@click="CommandClick ('3', '', dataDetail.row)"
					:disabled="getAppForms[frmID].Properties.tombol.D.disabled" />
			</div>	

			<div v-else-if="(col.tipeGrid == 'act002' ?  true : false)">
				<q-fab color="purple" dense icon="keyboard_arrow_up" direction="right" >
				  <q-fab-action dense color="primary" icon="edit"  
					:disabled="getAppForms[frmID].Properties.tombol.E.disabled"
				  	@click.native="CommandClick ('2', '', dataDetail.row)" />
				  <q-fab-action dense color="secondary" icon="delete"  
					:disabled="getAppForms[frmID].Properties.tombol.D.disabled"
				  	@click.native="CommandClick ('3', '', dataDetail.row)" />
				  <q-fab-action dense color="secondary" icon="receipt" 
					:disabled="getAppForms[frmID].Properties.tombol.V.disabled"
				  	@click.native="CommandClick ('6', '', dataDetail.row)" />
				</q-fab> 
			</div>	
			
			<div v-else-if="(col.tipeGrid == 'act003' ?  true : false)">
				<q-btn round dense inline icon="list" 
					@click.native="tes(dataDetail)" />
			</div>		

			<div v-else-if="(col.tipeGrid == 'act101' ?  true : false)">
				<q-btn icon="check_circle" color="primary" round dense outline 
					@click="CommandClick ('2', '', dataDetail.row)"
					:disabled="getAppForms[frmID].Properties.tombol.E.disabled" />
			</div>

			<div v-else-if="(col.tipeGrid == 'act102' ?  true : false)" class="row">
				<q-checkbox color="primary" v-model="dataDetail.selected" />
			</div>


			<div v-else-if="(col.tipeGrid == 'txt001' ?  true : false)">
				<q-chip small color="secondary">{{ dataDetail.row[col.name].trim() }}</q-chip>
			</div>		

			<div v-else-if="(col.tipeGrid == 'dtp001' ?  true : false)" class="center">
					<div class="row" v-if="getCellTglValue(dataDetail, col, 'D') != ''">
						<q-chip small dense class="bg-amber " >
							{{ getCellTglValue(dataDetail, col, "D") }}
						</q-chip>
						<div class="column q-pa-xs ">
							<span class="row text-weight-bold">
								{{ getCellTglValue(dataDetail, col, 'MM') }}
							</span>
							<small class="row q-subtitle">
								{{ getCellTglValue(dataDetail, col, 'Y') }}
							</small>
						</div>
					</div>
			</div>				

			<div v-else>							
		  		<span>
		  			{{ cetakCellValue(dataDetail, col) }}
		  		</span>
			</div>
		</q-td>
	</q-tr>
<!-- 
	Didalam template tidak bisa 2 <tr>	
 -->
<!--  
    <q-tr v-show="dataDetail.expand" :props="dataDetail">
      <q-td colspan="100%">
        <div class="text-right">
        	This is expand slot for row
        </div>
      </q-td>
    </q-tr>  
 -->
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	export default { 
  		name: 'ObjGrid_D',	
  		props: {
            frmID: { type : String },
            subFrmID: { type : String },
            myGrid: { type : Object },
            frmType: { type : String },
            dataDetail: {}
        },	
		computed: {
	      	...mapGetters('App',['getAppForms']),
	    },
	    methods: {
			...mapMutations('App',['setAppForms_Data']),
			CommandClick: function (mode, HakAkses, Rows) {
				this.setAppForms_Data({
					id: this.frmID, 
		            path: this.subFrmID+'Grid.RowData', 
		            data: Rows
				});
				this.getAppForms[this.frmID].CommandClick(mode);
				return '';
			},
			getCellTglValue (p, c, Jenis) {
				var Nilai = p.row[c.name] === null ? '' : p.row[c.name];
					Nilai = Nilai.trim();

				var Bulan = ['', 'Jan','Feb','Mar','Apr','May','Jun'
						,'Jul','Aug','Sep','Oct','Nov','Dec']	
				var BulanPenuh = ['', 'January','February','March','April','May','June'
						,'July','August','September','October','November','December']


				switch(Jenis) {
					case "D":
						var Hasil = Nilai.slice(6,8);
						break;
					case "M":
						var Hasil = Nilai.slice(4,6) ;
						var Hasil = Bulan[Number(Hasil)];
						break;
					case "MM":
						var Hasil = Nilai.slice(4,6) ;
						var Hasil = BulanPenuh[Number(Hasil)];
						break;
					case "Y":
						var Hasil = Nilai.slice(0,4);
						break;
				}
				return Hasil

			},			
			cetakCellValue (p, c) {
				var nilai = ""
				p.row[c.name] = p.row[c.name] === null ? '' : p.row[c.name];
				switch(c.tipe) {
					case "dtp":
						var Tgl = p.row[c.name].trim();
						
						if (Tgl == "") {
							nilai = ""
						} else {						
							var Bulan = ['', 'January','February','March','April','May','June'
									,'July','August','September','October','November','December']

							var Y = Tgl.slice(0,4);
							var M = Tgl.slice(4,6) ;
							var D = Tgl.slice(6,8);

							nilai = D + '-' + Bulan[Number(M)] + '-' + Y;
						}
						// nilai = p.row[c.name];
						break;
					
					case "txt":
						if (c.panjangKalimat === 0) {
							nilai = p.row[c.name].trim() ; 
						} else {
							nilai = p.row[c.name].trim().substring(0, c.panjangKalimat); 
							if ((c.panjangKalimat - p.row[c.name].length) < 0) {
								nilai = nilai + "...";
							}
						}	
						break;
					default:
						nilai = typeof(p.row[c.name]) === 'number' ? p.row[c.name] : p.row[c.name].trim() ; 
						break;
				}
				return nilai;
			},

			RowClick (row) {
				switch (this.frmType) {
					case "popup" :
						// console.log('ObjGrid_D - RowClick', this.myGrid);
						this.myGrid.PopSetValue({
							flag: true, 
							iy: typeof(row[this.myGrid.Grid.Keys]) === 'number' ?  
										row[this.myGrid.Grid.Keys] : 
										row[this.myGrid.Grid.Keys].trim(), 
							code: row[this.myGrid.PopCode].trim(), 
							desc: row[this.myGrid.PopDesc].trim(),
							data: row
						});
						this.myGrid.ShowPopUpModal = !this.myGrid.ShowPopUpModal;
						break;
					default:
						break;
				}
			},				
	    },
	    
	}
</script>

