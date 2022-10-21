<div style="display: flex; margin-bottom: 1rem;">
	<div class="col-3 col">
		<slot name="top-left" />
	</div>
	<div
		class="col-6 col"
		style="padding-bottom: 0; min-height: 11rem; align-items: flex-end; display: flex; justify-content: center;"
	>
		<slot name="top" />
	</div>
	<div class="col-3 col">
		<slot name="top-right" />
	</div>
</div>

<div style="display: flex; margin-bottom: 1rem; flex: 1;">
	<div class=" col" style="display: flex; flex: 0; min-width: 14rem; justify-content: center;">
		<slot name="left" />
	</div>

	<div style="flex: 1; display: flex;">
		<slot name="center" />
	</div>

	<div class=" col" style="display: flex; flex: 0; min-width: 14rem; justify-content: center;;">
		<slot name="right" />
	</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;padding-bottom: 1rem;">
	<slot name="bottom" />
</div>
