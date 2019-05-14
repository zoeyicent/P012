<template>
  <q-layout view="lHr LpR lFr"> <!-- lHh Lpr lFf -->
	<q-page-container class="myBackGround">
	  	<q-page class="docs-input column justify-around">
				<div class="row col-xs-12 col-sm-10 justify-center q-ma-sm">
				  <q-card class="text-left round dense bg-white">
						<div class="round" style="border-style: solid; border-color: white; width: 300px;" >

							<q-card-title class="bg-primary text-white">

								<div class="row">
									<div class="col-3" />
									<div class="col-6 text-center">
										<svg id="logo" viewBox="0 0 483 483"
												style="enable-background:new 0 0 460 460; padding:5px 5px 5px 5px;"
												xml:space="preserve" width="130px" height="130px"
												v-html="logoVariable">
										</svg>
									</div>
									<div class="col-3 text-right">
										<q-btn 
											:label="version"
											outline
											size="12px"
											@click="opened = true"
										/>
									</div>
									<div class="col-12 text-center q-headline text-weight-bold">
										{{getAppName}}
									</div>
								</div>
							</q-card-title>

							<q-card-main class="bg-white q-mt-sm">
								<!-- <q-field icon="account circle" helper="Always remember" > -->
								<q-field icon="account circle">
									<q-input
										ref="login.USER"
										v-model="login.USER"
										float-label="Username" 
										placeholder="Type your Username" class="myfont"
										:error="$v.login.USER.$error"
									/>
								</q-field>
								<!-- <q-field icon="lock" helper="Don't give your password to anyone" > -->
								<q-field icon="lock">
									<q-input
										ref="login.PASS"
										v-model="login.PASS" 
										type="password" 
										v-on:keyup.enter.space="BtnLogin"
										float-label="Password" class="myfont"
										:error="$v.login.PASS.$error"
									/>
								</q-field>
								<q-toggle 
									v-model="login.KEEP"
									color="primary"
									label="Keep me signed in"
									true-value="yes"
									false-value="no"
									class="q-mt-sm"
								/>
							</q-card-main>

							<q-card-actions class="justify-center bg-white">
								<q-btn icon="vpn key" 
										color="primary" 
										class="full-width q-mb-lg" 
										label="Login" 
										@click="BtnLogin" />
								<div class="q-mb-md">
									<div style="font-size: 13px" class="text-center" v-html="version" />
								</div>								
							</q-card-actions>

						</div>
				  </q-card>

					<q-modal 
						v-model="opened" minimized
						:content-css="{ padding: '10px', minWidth: !$q.platform.is.mobile ? '400px' : '300px', maxWidth: !$q.platform.is.mobile ? '400px' : '300px' }"
					>
						<q-modal-layout>
							<q-jumbotron class="q-pa-md pre-formatted">
								<div class="q-headline text-weight-bold">{{getAppName}} v{{version}}</div>
								<hr class="q-hr q-my-md">
								<div class="q-body-2" style="white-space: pre-wrap" v-html="versionInfo" />
							</q-jumbotron>
						</q-modal-layout>
					</q-modal>

				</div>
	  	</q-page>
  	</q-page-container>
  </q-layout>
</template>

<script>

	import logoData from './logoData';
	import versionInfo from './versionInfo';
	import { required } from 'vuelidate/lib/validators'
	import Vivus from 'vivus';
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

			logoVariable () {
				return logoData[this.logo];
			},			
			copyright() { return this.getAppCopyright; },
			version() { return this.getAppVersion; },
			versionInfo () {
				return versionInfo[this.version];
			},
	  },
		methods: {
			// ...mapMutations('App',['setAppForms','setAppForms_Data']),
			// ...mapActions('App',['doAppLogin']),
			BtnLogin() {
				this.$v.login.$touch()
				if (this.$v.login.$error) {
					if (!this.$v.login.USER.required) {
						this.$q.notify('Username is required.')
						this.$refs['login.USER'].focus()
					} else if (!this.$v.login.PASS.required) {
						this.$q.notify('Password is required.')
						this.$refs['login.PASS'].focus()
					}
					return
				}

				weAuth.login({
					form: this,
					user: this.login.USER,
					pass: this.login.PASS,
					keep: this.login.KEEP
				});
			},			
			startAnimation () {
				this.vivus = new Vivus('logo', {
					duration: 400,
					forceRender: false
				})
			},
			openModal (data) {
				this.opened = true
			},
		},		
		data () {
			return {
				logos: Object.keys(logoData),
				logo: 'Molectron', // Keytronic, Digitalizer, Molectron, WilEdi
				login: {
					USER: '',
					PASS: '',
					KEEP: '',
				},
				opened: false,
			}
		},
		validations: {
			login: {
				USER: { required },
				PASS: { required }
			}
		},
	}

</script>