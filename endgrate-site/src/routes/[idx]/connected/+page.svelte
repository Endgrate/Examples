<script lang="ts">
	import PushData from "../../pushData.svelte";
	import PullData from "../../pullData.svelte";
	import { onMount } from "svelte";
	import { connected } from "$lib/stores";
	import { updateSessions } from "$lib/update";

	let session_id = "";
	let endgrate_type = "";
	let provider = "";

	let returnData = {};
	let schema = {};

	let pullChose = false;
	let pushChose = false;

	let pullComponent: PullData;
	let pushComponent: PushData;
	let pullHeight: number;
	let pushHeight: number;

	onMount(() => {
		connected.set(updateSession);
		updateSessions();
	});

	function updateSession(
		id: string,
		type: string,
		prov: string,
		type_schema: object,
		data: object,
	) {
		session_id = id;
		endgrate_type = type;
		provider = prov;
		returnData = data ?? {};
		schema = type_schema;

		pullChose = false;
		pushChose = false;

		pushComponent.updateSchema(schema);
		pullComponent.updateData(returnData);
	}
	async function pullData() {
		let formData = new FormData();
		formData.set("session_id", session_id);
		formData.set("endgrate_type", endgrate_type);

		const response = await fetch("/api/pull", {
			method: "POST",
			body: formData,
		}).then(async (resp) => await resp.json());

		if (response.status != "error") {
			const sessions = JSON.parse(localStorage.getItem("sessions")!);
			const cur_session = JSON.parse(localStorage.getItem("cur_session")!);
			returnData = response.returnData;
			sessions[cur_session].returnData = returnData;

			localStorage.setItem("sessions", JSON.stringify(sessions));
			pullComponent.updateData(returnData);
		} else {
			console.error("COULDNT RETRIEVE DATA");
			pullComponent.error();
		}
	}
	async function pushJson(e: CustomEvent) {
		const finalJson = e.detail;
		console.log("pushing JSON: " + finalJson);

		const sessions = JSON.parse(localStorage.getItem("sessions")!);
		const cur_session = JSON.parse(localStorage.getItem("cur_session")!);

		let formData = new FormData();
		formData.set("pushJson", finalJson);
		formData.set("session_id", sessions[cur_session].session_id);
		formData.set("endgrate_type", sessions[cur_session].endgrate_type);

		const response = await fetch("/api/push", {
			method: "POST",
			body: formData,
		}).then(async (resp) => await resp.json());

		console.log(response.status);
		pushComponent.setStatus(response.status);
	}
</script>

<p class=" font-semibold text-lg">
	Current session type: {endgrate_type}
</p>
<p class=" font-semibold text-lg m-0">
	Current provider: {provider}
</p>

<nav
	class=" border-[3px] rounded-sm border-primary bg-secondary w-[90%] mt-[40px] mb-[0px]"
>
	<input hidden={true} type="checkbox" id="touch" />
	<button
		class="w-[99%] flex h-10 items-center justify-between border-primary px-1"
		on:click={() => (pullChose = !pullChose)}
	>
		<span class="flex flex-row items-center w-full justify-between">
			<div class="flex items-center">
				<xml class="mx-1" version="1.0" encoding="utf-8">
					<!-- Generator: Adobe Illustrator 22.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
					<svg
						fill="#1C2033"
						width="18"
						height="18"
						version="1.1"
						id="lni_lni-download"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 64 64"
						style="enable-background:new 0 0 64 64;"
						xml:space="preserve"
					>
						<g>
							<path
								d="M60,44c-1.2,0-2.3,1-2.3,2.3v8.9c0,0.9-0.7,1.6-1.6,1.6H7.9c-0.9,0-1.6-0.7-1.6-1.6v-8.9C6.3,45,5.2,44,4,44
			s-2.3,1-2.3,2.3v8.9c0,3.4,2.7,6.1,6.1,6.1h48.3c3.4,0,6.1-2.7,6.1-6.1v-8.9C62.3,45,61.2,44,60,44z"
								stroke="#1C2033"
								stroke-width="3"
							/>
							<path
								d="M30.4,46.5c0.4,0.4,1,0.6,1.6,0.6s1.1-0.2,1.6-0.6l14.5-14.1c0.9-0.9,0.9-2.3,0-3.2c-0.9-0.9-2.3-0.9-3.2,0L34.3,39.6V5
			c0-1.2-1-2.3-2.3-2.3c-1.2,0-2.3,1-2.3,2.3v34.6L19.1,29.2c-0.9-0.9-2.3-0.8-3.2,0c-0.9,0.9-0.8,2.3,0,3.2L30.4,46.5z"
								stroke="#1C2033"
								stroke-width="3"
							/>
						</g>
					</svg>
				</xml>

				<p class="ml-2 text-xl font-semibold">Pull Data</p>
			</div>
			<xml
				version="1.0"
				encoding="utf-8"
				style="rotate: {pullChose ? 0 : 180}deg;"
				class=""
			>
				<svg
					fill="#1C2033"
					width="16"
					height="16"
					version="1.1"
					id="lni_lni-chevron-up"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 64 64"
					style="enable-background:new 0 0 64 64;"
					xml:space="preserve"
				>
					<g>
						<path
							d="M55,45.6c-0.6,0-1.1-0.2-1.6-0.6L32,23.9L10.6,44.9c-0.9,0.9-2.3,0.9-3.2,0c-0.9-0.9-0.9-2.3,0-3.2l23-22.6
				c0.9-0.9,2.3-0.9,3.2,0l23,22.6c0.9,0.9,0.9,2.3,0,3.2C56.2,45.3,55.6,45.6,55,45.6z"
							stroke="#1C2033"
							stroke-width="5"
						/>
					</g>
				</svg>
			</xml>
		</span>
	</button>
	<div
		class="transition-max-height overflow-hidden"
		style="max-height: {pullChose
			? pullHeight + 100
			: '0'}px; transition-duration: {Math.min(
			Math.round(pullHeight / 100) / 10,
			1,
		)}s ;"
	>
		<div bind:offsetHeight={pullHeight}>
			<PullData on:pull={pullData} bind:this={pullComponent} />
		</div>
	</div>
</nav>
<nav
	class=" border-[3px] rounded-sm border-primary bg-secondary w-[90%] m-[0px] mt-[20px] mb-[20px]"
>
	<input hidden={true} type="checkbox" id="touch" />
	<button
		class=" w-[99%] h-10 items-center flex justify-between border-primary px-1"
		on:click={() => (pushChose = !pushChose)}
	>
		<span class="flex flex-row items-center w-full justify-between">
			<div class="flex items-center">
				<xml class="mx-1" version="1.0" encoding="utf-8">
					<!-- Generator: Adobe Illustrator 22.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
					<svg
						fill="#1C2033"
						width="18"
						height="18"
						version="1.1"
						id="lni_lni-download"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 64 64"
						style="enable-background:new 0 0 64 64;"
						xml:space="preserve"
					>
						<g>
							<path
								d="M60,44c-1.2,0-2.3,1-2.3,2.3v8.9c0,0.9-0.7,1.6-1.6,1.6H7.9c-0.9,0-1.6-0.7-1.6-1.6v-8.9C6.3,45,5.2,44,4,44
		s-2.3,1-2.3,2.3v8.9c0,3.4,2.7,6.1,6.1,6.1h48.3c3.4,0,6.1-2.7,6.1-6.1v-8.9C62.3,45,61.2,44,60,44z"
								stroke="#1C2033"
								stroke-width="3"
							/>
							<path
								d="M19.1,20.7l10.7-10.4v34.6c0,1.2,1,2.3,2.3,2.3c1.2,0,2.3-1,2.3-2.3V10.3l10.7,10.4c0.4,0.4,1,0.6,1.6,0.6
		c0.6,0,1.2-0.2,1.6-0.7c0.9-0.9,0.8-2.3,0-3.2L33.6,3.4c-0.9-0.8-2.3-0.8-3.1,0L15.9,17.5c-0.9,0.9-0.9,2.3,0,3.2
		C16.8,21.5,18.2,21.6,19.1,20.7z"
								stroke="#1C2033"
								stroke-width="3"
							/>
						</g>
					</svg>
				</xml>
				<p class="ml-2 text-xl font-semibold">Push Data</p>
			</div>
			<xml
				version="1.0"
				encoding="utf-8"
				style="rotate: {pushChose ? 0 : 180}deg;"
				class=""
			>
				<!-- Generator: Adobe Illustrator 22.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
				<svg
					fill="#1C2033"
					width="16"
					height="16"
					version="1.1"
					id="lni_lni-chevron-up"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 64 64"
					style="enable-background:new 0 0 64 64;"
					xml:space="preserve"
				>
					<g>
						<path
							d="M55,45.6c-0.6,0-1.1-0.2-1.6-0.6L32,23.9L10.6,44.9c-0.9,0.9-2.3,0.9-3.2,0c-0.9-0.9-0.9-2.3,0-3.2l23-22.6
				c0.9-0.9,2.3-0.9,3.2,0l23,22.6c0.9,0.9,0.9,2.3,0,3.2C56.2,45.3,55.6,45.6,55,45.6z"
							stroke="#1C2033"
							stroke-width="5"
						/>
					</g>
				</svg>
			</xml>
		</span>
	</button>
	<div
		class="transition-max-height overflow-hidden"
		style="max-height: {pushChose
			? pushHeight + 100
			: '0'}px; transition-duration: {Math.round(pushHeight / 100) / 10}s ;"
	>
		<div bind:offsetHeight={pushHeight}>
			<PushData on:push={pushJson} bind:this={pushComponent} />
		</div>
	</div>
</nav>
