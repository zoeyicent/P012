<template>

  <!-- <q-layout view="hHh LpR fFf">  -->
  <!-- <q-layout view="lHh Lpr lFr">  -->
  <q-layout view="lHr LpR lFr"> 
  <!-- <q-layout view="hHh Lpr lFf">  -->
  	<q-layout-header>
	  	<q-toolbar v-if="getAppForms[frmID].Menu.mActiveForm === 'mainMenu' ">
	        <q-btn dense round outline @click="mWest" icon="menu" />
	  		<q-toolbar-title>
	  		    {{ getAppName }} Application
          		<div slot="subtitle">{{ getAppDescription }} [v{{ getAppVersion }}] </div>
	  		</q-toolbar-title>
	        <q-btn dense round outline @click="mEast" icon="info" />
	  	</q-toolbar>
	  	<q-toolbar v-else>
	        <q-btn dense round outline @click="mWest" icon="menu" />
	  		<q-toolbar-title>
	  		    [{{ FormChildActive.Properties.shortCut }}] 
          		<div slot="subtitle">{{ FormChildActive.Properties.title }}</div>
	  		</q-toolbar-title>
		    <q-btn dense round outline icon="add"
		    	class="q-mr-sm"
		    	@click="FormChildActive.CommandClick('1')"  
		    	v-if="FormChildActive.Properties.tombol.A.has"
		    	v-show="FormChildActive.Properties.tombol.A.show"
		    	/>
		    <q-btn dense round outline icon="save" 
		    	class="q-mr-sm"
		    	@click="FormChildActive.CommandClick('4')" 
		    	v-if="FormChildActive.Properties.tombol.Save.has"
		    	v-show="FormChildActive.Properties.tombol.Save.show"
		    	/>
		    <q-btn dense round outline icon="cancel" 
		    	@click="FormChildActive.CommandClick('5')" 
		    	class="q-mr-sm"
		    	v-if="FormChildActive.Properties.tombol.Cancel.show"
		    	v-show="FormChildActive.Properties.tombol.Cancel.show"
		    	/>
<!--   			
  			<span class="text-right q-mr-sm">
	  		    [{{ FormChildActive.Properties.shortCut }}] 
          		<div slot="subtitle">{{ FormChildActive.Properties.title }} </div>
          	</span>
 -->
	        <q-btn dense round outline @click="mEast" icon="info" />
	  	</q-toolbar>

    </q-layout-header>


    <q-layout-footer>
      <q-toolbar style="font-size: 14px" >
          <q-btn dense round outline label="cobacoba" @click="CobaCoba()"/>
        <q-toolbar-title>
          <div v-if="getAppForms[frmID].Menu.mActiveForm != 'mainMenu'">
          	{{ FormChildActive.Properties.titleAction }} 
          </div>
        </q-toolbar-title>
      </q-toolbar>    
    </q-layout-footer>


    <q-layout-drawer 
    	v-model="getAppForms[frmID].Menu.mWest" 
    	side="left" 
    	class="docs-tree">
    	<MenuWest :frmID="frmID" />
    </q-layout-drawer>

    <q-layout-drawer 
    	v-model="getAppForms[frmID].Menu.mEast" 
    	side="right">     	
    	<MenuEast 
    		v-if="getAppForms[frmID].Menu.mActiveForm != 'mainMenu'"
    		:frmID="getAppIdFormActive(frmID)" />
    </q-layout-drawer>

	<q-page-container class="">
	  	<q-page class="docs-input column ">

			<transition>
			  <keep-alive>
				<router-view :key="$route.fullPath"></router-view>
			  </keep-alive>
			</transition>

	  	</q-page>
  	</q-page-container>


  </q-layout>

</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex';
	import weAuth from 'src/auth';
	import MenuWest from './MenuWest.vue';
	import MenuEast from './MenuEast.vue';

	export default { 
		name: 'MainMenu',
  		components : { MenuWest, MenuEast },	
		created() {
			weAuth.checkLogin();
			this.setAppForms(this.frmID);
			// console.log(this.$route.name);

			var Data = {
				mWest : true,
				mEast : false,
				mNorth : true,
				mSouth : true,
				mActiveForm : 'mainMenu',
				mHistoryForm : []
			}

			this.setAppForms_Data({
				id: this.frmID,
				path:'Menu',
				data: Data});


		},
		mounted() {
		},
		// beforeMount () { console.log('MainMenu beforeMount', 'Deskripsikan disini') },	
		computed: {	
			...mapGetters('App',['getAppName','getAppDescription','getAppCopyright','getAppVersion',
								 'getAppForms','getAppIdFormActive','getAppModules']),	
			FormChildActive() {
				// console.log('MainMenu.vue ','MdiForm - FormChildActive ZZZZZZZZZZz');
				return this.getAppForms[this.getAppIdFormActive(this.frmID)];
			},			
		},	
		methods: {
			...mapMutations('App',['setAppForms','setAppForms_Data']),
			mWest() {
				this.setAppForms_Data({
					id: this.frmID,
					path: 'Menu.mWest',
					data: !this.getAppForms[this.frmID].Menu.mWest});				
			},
			mEast() {
				this.setAppForms_Data({
					id: this.frmID,
					path: 'Menu.mEast',
					data: !this.getAppForms[this.frmID].Menu.mEast});				
			},
			CobaCoba() {
				this.getAppModules['CallMenu']('4');
			}
		},			
		data () {
			return {
				frmID: 'MainMenu'
			}
		},
	}
</script>


