<div class="padding" style="min-height: 100vh; display: flex; flex-direction: column;">
	<slot />
</div>

<style global>
	html {
		font-size: 12px;
	}

	@media only screen and (min-width: 720px) {
		html {
			font-size: 14px;
		}
	}

	@media only screen and (min-width: 960px) {
		html {
			font-size: 16px;
		}
	}

	@media only screen and (min-width: 1240px) {
		html {
			font-size: 18px;
		}
	}
</style>
