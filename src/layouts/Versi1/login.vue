<template>
  <q-layout view="lHr LpR lFr"> <!-- lHh Lpr lFf -->
	<q-page-container class="myBackGround">
	  	<q-page class="docs-input column justify-around">
				<div class="row col-xs-12 col-sm-10 justify-center q-ma-sm">
				  <q-card class="text-left round dense bg-white">
						<div class="round" style="border-style: solid; border-color: white; width: 300px;" >

							<q-card-title class="bg-primary text-white">
								<div class="text-center">
									<svg id="logo" viewBox="0 0 483 483"
											style="enable-background:new 0 0 460 460; padding:5px 5px 5px 5px;"
											xml:space="preserve" width="130px" height="130px"
											v-html="logoMethod">
									</svg>
								</div>
								<div class="text-center" style="font-size: 30px; font-family: Calibri">
									{{getAppName}}
								</div>
							</q-card-title>

							<q-card-main class="bg-white q-mt-md">
								<!-- <q-field icon="account circle" helper="Always remember" > -->
								<q-field icon="account circle">
									<q-input v-model="USER"
											float-label="Username" 
											placeholder="Type your Username" />
								</q-field>
								<!-- <q-field icon="lock" helper="Don't give your password to anyone" > -->
								<q-field icon="lock">
									<q-input v-model="PASS" 
											type="password" 
												v-on:keyup.enter.space="BtnLogin"
											float-label="Password"  />
								</q-field>
								<q-toggle v-model="KEEP"
									color="primary"
									label="Keep me signed in"
									true-value="yes"
									false-value="no"
								/>

							</q-card-main>

							<q-card-actions class="justify-center bg-white">
								<q-btn icon="vpn key" 
										color="primary" 
										class="full-width q-mb-lg" 
										label="Login" 
										@click="BtnLogin" />
								<div class="q-mb-md">
									<div style="font-size: 13px" class="text-center" v-html="copyright" />
									<div style="font-size: 13px" class="text-center" v-html="version" />
								</div>								
							</q-card-actions>

						</div>
				  </q-card>
				</div>
	  	</q-page>
  	</q-page-container>
  </q-layout>
</template>

<script>
 	import logoData from './logoData';
	import Vivus from 'vivus';
	// import { mapGetters, mapMutations, mapActions } from 'vuex';
	import { mapGetters } from 'vuex';
	import weAuth from 'src/auth';

	export default { 
		name : 'PageIndex', 
		mounted () {
			this.startAnimation();
		},		
		created() {
		},			
		computed: {
			...mapGetters('App',['getAppName','getAppDescription','getAppCopyright','getAppVersion']),
			logoMethod () {
				return logoData[this.logo];
			},
			copyright() { return this.getAppCopyright; },
			version() { return '<b>v'+this.getAppVersion+'</b>'; },
	    },
		methods: {
			// ...mapMutations('App',['setAppForms','setAppForms_Data']),
			// ...mapActions('App',['doAppLogin']),
			BtnLogin() {
				weAuth.login({
					form: this,
					user: this.USER,
					pass: this.PASS,
					keep: this.KEEP
				});
			},			
			startAnimation () {
				this.vivus = new Vivus('logo', {
					duration: 400,
					forceRender: false
				})
			},
		},		
		data () {
			return {
				logos: Object.keys(logoData),
				logo: 'Molectron', // Keytronic, Digitalizer, Molectron
				USER: '',
				PASS: '',
				KEEP: ''
			}
		},
	}

</script>