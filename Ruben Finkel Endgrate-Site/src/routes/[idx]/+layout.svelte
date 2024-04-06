<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import SessionTitle from "../sessionTitle.svelte";
	import { sidebar, title, vcheck } from "$lib/stores";
	import { updateSessions } from "$lib/update";

	let sessions: Array<any>;
	let cur_session: number;
	let warnConfig: boolean;

	let sidebarComponent: any;
	sidebar.subscribe((value) => {
		sidebarComponent = value;
	});

	let titleComponent: SessionTitle;

	onMount(() => {
		vcheck.set(checkSession);
		if (!localStorage.getItem("sessions")) {
			localStorage.setItem("sessions", "[]");
			localStorage.setItem("cur_session", "0");
		}
		sessions = JSON.parse(localStorage.getItem("sessions")!);
		cur_session = parseInt(localStorage.getItem("cur_session")!);
		if (sessions.length == 0) {
			goto("/");
			return;
		}

		title.set(titleComponent);
		updateSessions();
	});

	function changeName(e: CustomEvent) {
		sessions = JSON.parse(localStorage.getItem("sessions")!);
		cur_session = JSON.parse(localStorage.getItem("cur_session")!);
		if (e.detail.name != "") {
			sessions[cur_session].name = e.detail.name;
		}

		localStorage.setItem("sessions", JSON.stringify(sessions));

		sidebarComponent.updateSession(sessions, cur_session);
	}

	let cur_session_version = 1.1;
	let version = cur_session_version;
	export function checkSession(cur_version: number) {
		// console.log(cur_version);
		version = cur_version;
	}
</script>

<SessionTitle
	warning={warnConfig}
	on:changeName={changeName}
	bind:this={titleComponent}
/>

{#if version == cur_session_version}
	<slot />
{:else}
	<div class="flex h-full items-end">
		<p class="text-red-600 text-3xl mb-10">
			This session's version is out of date
		</p>
	</div>
{/if}
