import { sidebar, title, connect, connected, vcheck } from "./stores";

let sidebarComponent: any;
sidebar.subscribe((value) => {
    sidebarComponent = value;
});
let titleComponent: any;
title.subscribe((value) => {
    titleComponent = value;
});
let connectFunc: any;
connect.subscribe((value) => {
    connectFunc = value;
})
let connectedFunc: any;
connected.subscribe((value) => {
    connectedFunc = value;
})
let vcheckFunc: any;
vcheck.subscribe((value) => {
    vcheckFunc = value;
})

export function updateSessions() {
    let sessions: Array<any> = JSON.parse(localStorage.getItem("sessions")!);
    let cur_session: number = parseInt(localStorage.getItem("cur_session")!);

    try {
        sidebarComponent.updateSession(sessions, cur_session);
    }
    catch {
        console.warn("failed to update sidebar");
    }

    try {
        titleComponent.setName(sessions[cur_session].name, sessions[cur_session].state);
    }
    catch {
        console.warn("failed to update title");
    }

    try {
        connectFunc(sessions, cur_session);
    }
    catch {
        console.warn("failed to update connect");
    }

    try {
        connectedFunc(sessions[cur_session].session_id, sessions[cur_session].endgrate_type, sessions[cur_session].provider, sessions[cur_session].schema, sessions[cur_session].returnData);
    }
    catch {
        console.warn("failed to update connected");
    }

    try {
        vcheckFunc(sessions[cur_session].session_version ?? 0);
    }
    catch {
        console.warn("failed to check version");
    }
}