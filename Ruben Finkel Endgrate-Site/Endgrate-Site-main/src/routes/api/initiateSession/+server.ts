import { env } from "$env/dynamic/private";
import { isDev } from "$lib/env.ts";

const initiateOptions = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: env.API_KEY!
    },
    body: ""
};

export async function POST({ request }) {
    let req = await request.formData();
    console.log(req.get("endgrate_type"));

    initiateOptions.body = JSON.stringify({
        redirect_url: (isDev ? "http://localhost:5173" : "https://endgrate-site.vercel.app") + '/?check_id=' + req.get("check_id"),
        schema: [{ endgrate_type: req.get("endgrate_type") }],
        save_session: (!isDev)
    });

    console.log("save session is " + (!isDev))

    const session_id: string = await fetch('https://endgrate.com/api/session/initiate', initiateOptions)
        .then((response) => response.json())
        .then((response) => response.session_id)
        .catch((err) => console.error(err));
    console.log("Created: ", session_id);

    const response = new Response(JSON.stringify({
        status: "success",
        session_id: session_id
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response
}