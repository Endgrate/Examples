import { env } from '$env/dynamic/private';

const checkOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: env.API_KEY!
    }
};

export async function POST({ request }) {
    let req = await request.formData();
    let session_id = req.get("session_id");
    let endgrate_type = req.get("endgrate_type");
    console.log('https://endgrate.com/api/session/configuration?session_id=' +
        session_id);
        
    const sessionStatus = await fetch(
        'https://endgrate.com/api/session/configuration?session_id=' +
        session_id,
        checkOptions
    )
        .then((response) => response.json())
        .catch((err) => console.error(err));

    const success = (sessionStatus.message != 'Session not yet configured.') ? "success" : "failed";


    const response = new Response(JSON.stringify({
        status: success,
        provider: sessionStatus.endgrate.provider_info.display_name,
        schema: sessionStatus.schemas[endgrate_type!.toString()].schema.properties
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response
}