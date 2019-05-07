<template>
	<div>
		<div class="bg-faded" >
			<q-item>  <!-- class="bg-secondary" -->
				<q-item-side :avatar="profilePic" />
				<q-item-main>
					<q-item-tile text-color="white" class="text-weight-bold" label> {{ getAppUser.userName }} </q-item-tile>
					<q-item-tile text-color="white" sublabel>Empower your development skills</q-item-tile>
				</q-item-main>
			</q-item>
			<q-item>
				<q-btn-group class="full-width q-mb-sm">
					<q-btn color="primary" icon="home" class="col-4" 
						@click="getAppModules['CallMenu']('mainMenu');"/>
					<q-btn color="primary" icon="dashboard" class="col-4" 
						@click="ShowMenuLayoutTree=!ShowMenuLayoutTree"/>
					<q-btn color="primary" icon="settings" class="col-4" />
				</q-btn-group>
			</q-item>
		</div>		

		<q-scroll-area
			:style="setHeight">
			<q-tree class="myfont" 
				:selected.sync="ListMenuSelected" 
				:nodes="getAppForms[frmID].ListMenu === undefined ? [] : getAppForms[frmID].ListMenu.DataTree" 
				:expanded.sync="ListMenuExpanded" 
				node-key="value" 
				@click.native="ClickListMenu()"
				v-show="ShowMenuLayoutTree"
			/>

			<q-list style="padding: 0px;"
				link highlight 
				dense separator 
				v-show="!ShowMenuLayoutTree"
			>
			  <!-- <q-list-header>Working Area</q-list-header> -->
			  <q-item 
			  	v-for=" (c, index) in getAppForms[frmID].Menu.mHistoryForm "
				:key="index"
				@click.native="getAppModules.CallMenu(c.value)">
			    <!-- <q-item-side avatar="statics/linux-avatar.png" /> -->
			    <q-item-main class="q-ma-xs" style="font-size: 13px">
				    <q-item-tile label>{{c.shortCut}}}</q-item-tile>
				    <q-item-tile sublabel>{{ c.title }}</q-item-tile>
				</q-item-main>
			    <!-- <q-item-side right icon="chat_bubble" /> -->
			    <q-item-side right>
					<q-chip class="bg-amber " >
						{{ String(index+101).substr(-2) }}
					</q-chip>
			    </q-item-side>

			  </q-item>
			</q-list>

		</q-scroll-area>
<!--  
				:expanded.sync="propsExpanded" 

-->
		<div class="toolbar fixed-bottom">
			<q-btn
				color="red"
				class="full-width"
				@click="BtnLogOff"
				size="lg"
    		>
				<div style="font-size: 16px;">
					<q-icon name="power_off" />
					&nbsp;Logout
				</div>
			</q-btn>
		</div>

	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	import weAuth from 'src/auth';

	export default { 
		name: 'MenuWest',	
  		props: {
            frmID: { type : String }
        },
		created() {			
			var Saya = this;

			this.setAppModules({
				id: 'MdiFrm',
				params: this.frmID});

			weAuth.loadMenuTree(this, this.frmID);

			this.setAppModules({
				id: 'GetMenuID', 
				params: (Selection) => {
						if (this.getAppForms[this.frmID] != undefined) {
							var a = this.getAppForms[this.frmID].ListMenu.DataRute;		
								a = a.find( r => String(r.name) === Selection);					
								if (a) {
									return a.url.split('').reverse().join('');
								}
								return "";
						}
					}
				});

			this.setAppModules({
				id: 'CallMenu', 
				params: (Selection) => {
						var fID = this.getAppModules.GetMenuID(Selection);
						if (fID != "") {
							if (!this.getAppForms[fID]) { // Begin Create Menu/Form
								this.setAppForms(fID);

								var Data = this.getAppModules.GetMenu(Selection);
								this.setAppForms_Data({
									id: fID,
									path:'Properties',
									data: Data});

								this.setAppForms_Data({
									id: fID,
									path:'Forms',
									data: {}});


								var hF = this.getAppForms[this.frmID].Menu.mHistoryForm;
									hF.push ({ id: this.getAppForms[fID].Properties.id,
											   label: this.getAppForms[fID].Properties.label,
											   value: this.getAppForms[fID].Properties.value,
											   title: this.getAppForms[fID].Properties.title,
											   shortCut: this.getAppForms[fID].Properties.shortCut});

								this.setAppForms_Data({
									id: this.frmID, 
									path:'Menu.mHistoryForm', 
									data: hF });



							}  // End Create Menu/Form 
						} 
						// console.log('Begin CallMenu');
						this.$router.push({name: Selection});
						this.setAppForms_Data({
							id: this.frmID, 
							path:'Menu.mActiveForm', 
							data: Selection });
						// console.log('End CallMenu');

					}
				});

			this.setAppModules({
				id: 'GetMenu', 
				params: (Selection) => {
						// console.log('List Menu Tree : ', this.getAppForms[this.frmID].ListMenu.DataTree);
						return this.$findObj(this.getAppForms[this.frmID].ListMenu.DataTree, 
								'children', 'idMenu', Selection );
					}
				});


		},
		mounted() {
			this.$nextTick(() => {
				window.addEventListener('resize', () => {
					this.windowHeight = window.innerHeight
					this.windowWidth = window.innerWidth
				});
			})			
		},
		// beforeMount () { console.log('MainMenu beforeMount', 'Deskripsikan disini') },	
		computed: {	
			...mapGetters('App',['getAppUser','getAppForms','getAppModules']),
			setHeight() {
				return `height: ${this.windowHeight-170}px `
			},
			// ListMenuSelected: {
			// 	get: function () {
			// 		return this.getAppForms[this.frmID].ListMenu === undefined ? '' : this.getAppForms[this.frmID].ListMenu.selected;
			// 	},
			// 	set: function (NewValue) {					
			// 		this.setAppForms_Data({
			// 			id: this.frmID, path:'ListMenu.selected', data: NewValue });
			// 	}
			// },
		},	
		methods: {
			...mapMutations('App',['setAppForms','setAppForms_Data','setAppModules']),
			ClickListMenu() {
				var selection = this.ListMenuSelected;
				if(selection) {
					if(selection.charAt(0) != 'H'){			
						this.getAppModules.CallMenu(selection);
					} else {
						const index = this.ListMenuExpanded.indexOf(selection);
						if (index > -1) {
							this.ListMenuExpanded.splice(index, 1);
						}
						else {
							this.ListMenuExpanded.push(selection);
						}
					}
				}
				this.ListMenuSelected = null
			},
			BtnLogOff() {
				weAuth.logout();
			}
		},			
		data () {
			return {
				windowHeight: window.innerHeight,
				windowWidth: window.innerWidth,
				profilePic: 'statics/default-pic.png',
				ListMenuExpanded: [],
				ListMenuSelected: '',
				ShowMenuLayoutTree: true,
			}
		},
	}
</script>


