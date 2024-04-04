import { env } from '$env/dynamic/private';

const pullOptions = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: env.API_KEY!
    },
    body: JSON.stringify({
        session_id: 'Set later once session starts',
        endgrate_type: 'type',
        synchronous: true
    })
};
const dataOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: env.API_KEY!
    }
};


export async function POST({ request }) {
    const req = await request.formData();
    const session_id = req.get("session_id");
    const endgrate_type = req.get("endgrate_type");

    pullOptions.body = JSON.stringify({
        session_id: session_id,
        endgrate_type: endgrate_type,
        synchronous: true
    });
    console.log("given: " + endgrate_type + "  id: " + session_id)

    let transferId = await fetch('https://endgrate.com/api/pull/transfer', pullOptions)
        .then((response) => response.json())
        .catch((err) => console.error(err));

    console.log('transfer id: ' + transferId.transfer_id);

    let returnData = await fetch(
        'https://endgrate.com/api/pull/data?endgrate_type=' + endgrate_type + '&transfer_id=' + transferId.transfer_id,
        dataOptions
    )
        .then((response) => response.json())
        .catch((err) => console.error(err));

    const response = new Response(JSON.stringify({
        status: (transferId.transfer_id != undefined ? "success" : "error"),
        returnData: returnData
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response
}