<script>
	import '../app.css'
	import 'papercss/dist/paper.min.css'
</script>

<div class="p-4 min-h-screen flex flex-row">
	<slot />
</div>

<style global>
	html {
		font-size: 13px;
	}

	@media only screen and (min-width: 480px) and (min-height: 480px) {
		html {
			font-size: 14px;
		}
	}

	@media only screen and (min-width: 768px) and (min-height: 768px) {
		html {
			font-size: 16px;
		}
	}

	@media only screen and (min-width: 1024) and (min-height: 1024px) {
		html {
			font-size: 18px;
		}
	}

	@media only screen and (min-width: 1200) and (min-height: 1200px) {
		html {
			font-size: 20px;
		}
	}
</style>
