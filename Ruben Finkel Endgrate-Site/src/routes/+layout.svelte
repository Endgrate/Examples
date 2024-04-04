<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import Sidebar from "./sidebar.svelte";
	import { goto } from "$app/navigation";
	import { sidebar, title } from "$lib/stores";
	import { updateSessions } from "$lib/update.js";
	import { v4 as uuidv4 } from "uuid";
	import { isDev } from "$lib/env.ts";
	import { inject } from "@vercel/analytics";

	export let data;

	interface Session {
		name: string;
		state: string;
		unique_id: string;

		session_version?: number;

		session_id?: string;
		endgrate_type?: string;
		provider?: string;

		schema?: any;
		returnData?: any;
	}

	console.log(`Running in ${isDev ? "development" : "production"} mode`);

	let cur_session: number;
	let sessions: Array<Session>;

	let sidebarComponent: Sidebar;

	let titleComponent: any;
	title.subscribe((value) => {
		titleComponent = value;
	});

	let checkId = $page.url.searchParams.get("check_id");

	onMount(async () => {
		if (sidebar != null) {
			sidebar.set(sidebarComponent);
		}
		if (!localStorage.getItem("sessions")) {
			localStorage.setItem("sessions", "[]");
			localStorage.setItem("cur_session", "0");
		}
		sessions = JSON.parse(localStorage.getItem("sessions")!);
		cur_session = parseInt(localStorage.getItem("cur_session")!);

		if (checkId != null) {
			let sameId;
			console.warn(checkId);

			for (let i = 0; i < sessions.length; i++) {
				if (sessions[i].unique_id == checkId) {
					if (sessions[i].session_id !== undefined) {
						sameId = i;
					} else {
						console.warn("TRIED TO CONNECT BEFORE INITIATED");
					}
					break;
				}
			}
			if (sameId !== undefined) {
				let formData = new FormData();
				console.log("inputing the id: " + sessions[sameId].session_id!);
				formData.set("session_id", sessions[sameId].session_id!);
				formData.set("endgrate_type", sessions[sameId].endgrate_type!);

				const response = await fetch("/api/checkProvider", {
					method: "POST",
					body: formData,
				}).then(async (resp) => await resp.json());

				if (response.status == "success") {
					console.warn("PROVIDER CONNECTED");
					sessions[cur_session].provider = response.provider;
					sessions[cur_session].state = "connected";
					console.log("setting schema: " + response.schema);
					sessions[cur_session].schema = response.schema;
					localStorage.setItem("sessions", JSON.stringify(sessions));
				} else {
					console.warn("PROVIDER NOT CONNECTED");
				}
			}
			checkId = null;
		}

		if (sessions.length == 0) {
			goto("/");
			return;
		}

		if (data.idx === undefined || parseInt(data.idx) == cur_session) {
			// console.log(sessions[cur_session].state);
			goto(`/${cur_session}/${sessions[cur_session].state}`);
			return;
		}

		if (
			Number.isInteger(parseInt(data.idx)) &&
			0 <= parseInt(data.idx) &&
			parseInt(data.idx) < sessions.length
		) {
			cur_session = parseInt(data.idx);
		} else {
			cur_session = 0;
		}
		localStorage.setItem("cur_session", cur_session.toString());
		console.log("manualy changed route to " + cur_session);
		goto(`/${cur_session}/${sessions[cur_session].state}`);
	});

	function createSession() {
		sessions = JSON.parse(localStorage.getItem("sessions")!);
		if (sessions.length > 0 && sessions[0].name == "") {
			sidebarComponent.close();
			return;
		}

		sessions.unshift({
			name: "",
			state: "create",
			unique_id: uuidv4(),
			session_version: 1.1,
		});
		cur_session = 0;

		localStorage.setItem("sessions", JSON.stringify(sessions));
		localStorage.setItem("cur_session", cur_session.toString());
		// console.log(sessions[cur_session].unique_id);

		goto(`/${cur_session}/create`);
		sidebarComponent.close();
		updateSessions();

		try {
			titleComponent.setName(sessions[cur_session].name);
		} catch {}
	}
	async function deleteSession(e: CustomEvent) {
		sessions = JSON.parse(localStorage.getItem("sessions")!);

		let deleteTry: any;
		if (sessions[e.detail.idx].session_id != null) {
			const formData = new FormData();
			formData.set("session_id", sessions[e.detail.idx].session_id!);

			deleteTry = await fetch("/api/delete", {
				method: "POST",
				body: formData,
			}).then(async (resp) => await resp.json());
		}

		if (
			sessions[e.detail.idx].session_id == null ||
			deleteTry.status == "success"
		) {
			sessions.splice(e.detail.idx, 1);
			cur_session = 0;

			localStorage.setItem("sessions", JSON.stringify(sessions));
			localStorage.setItem("cur_session", cur_session.toString());

			if (sessions.length > 0) {
				goto(`/${cur_session}/${sessions[cur_session].state}`);
			} else {
				goto("/");
				sidebarComponent.close();
				updateSessions();
				return;
			}
			updateSessions();
			console.log("SUCCESSFULLY DELETED SESSION");
		} else {
			console.error("AN ERROR OCCURED WHILE TYING TO DELETE SESSION");
		}
	}
	function setSession(e: CustomEvent) {
		sessions = JSON.parse(localStorage.getItem("sessions")!);
		cur_session = parseInt(localStorage.getItem("cur_session")!);
		if (sessions[cur_session].name == "" && e.detail.idx != cur_session) {
			sessions.splice(cur_session, 1);
			localStorage.setItem("sessions", JSON.stringify(sessions));
			cur_session = e.detail.idx - 1;
		} else {
			cur_session = e.detail.idx;
		}

		localStorage.setItem("cur_session", cur_session.toString());
		updateSessions();
		if (sessions.length > 0) {
			goto(`/${cur_session}/${sessions[cur_session].state}`);
		}
		sidebarComponent.close();
		console.log(sessions[cur_session].session_id);
	}
</script>

<main>
	<div class="flex justify-center min-h-[350px]">
		<div
			class="outline outline-2 rounded-xl bg-neutral-100 outline-gray-500 w-[80%] mt-[20px] pt-[15px] flex flex-col items-center"
		>
			{#if checkId != null}
				<h1>Checking Connection...</h1>
			{:else}
				<slot />

				{#if sessions && sessions.length == 0}
					<div class="flex w-full h-full justify-center items-end">
						<button
							class="btn btn-secondary w-[50%] h-20 text-xl mb-10"
							on:click={createSession}>Create</button
						>
					</div>
				{/if}
			{/if}
		</div>
	</div>
	<Sidebar
		bind:this={sidebarComponent}
		{sessions}
		{cur_session}
		on:newSession={createSession}
		on:deleteSession={deleteSession}
		on:setSession={setSession}
	/>
</main>
