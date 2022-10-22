<div class="flex mb-4">
	<div class="col-3 col">
		<slot name="top-left" />
	</div>
	<div class="col-6 col pb-0 md:min-h-44 items-end flex justify-center">
		<slot name="top" />
	</div>
	<div class="col-3 col">
		<slot name="top-right" />
	</div>
</div>

<div class="flex mb-4 flex-1">
	<div class="flex flex-0 ml-4 min-w-12 md:min-w-56 justify-center">
		<slot name="left" />
	</div>

	<div class="flex flex-1">
		<slot name="center" />
	</div>

	<div class="flex flex-0 mr-4 min-w-12 md:min-w-56 justify-center">
		<slot name="right" />
	</div>
</div>

<div class="flex flex-col items-center pb-4">
	<slot name="bottom" />
</div>
