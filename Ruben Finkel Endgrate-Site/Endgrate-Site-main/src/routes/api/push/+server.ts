import { env } from '$env/dynamic/private';

const pushOptions = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: env.API_KEY!
    },
    body: JSON.stringify({
        endgrate_type: '[type]',
        session_id: '[sesh id]',
        synchronous: true,
        transfer_data: []
    })
};

export async function POST({ request }) {
    const req = await request.formData();
    const endgrate_type = req.get("endgrate_type");
    const session_id = req.get("session_id");
    const pushJson: any = req.get("pushJson");

    pushOptions.body = JSON.stringify({
        endgrate_type: endgrate_type,
        session_id: session_id,
        synchronous: true,
        transfer_data: [{ data: JSON.parse(pushJson) }]
    })

    console.log("pushing:", pushJson, endgrate_type)

    const pullStatus: any = await fetch('https://endgrate.com/api/push/transfer', pushOptions)
        .then(response => response.json())
        .catch(err => console.error(err));


    const response = new Response(JSON.stringify({
        status: ((pullStatus.success ?? false) ? "success" : "error"),
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response
}