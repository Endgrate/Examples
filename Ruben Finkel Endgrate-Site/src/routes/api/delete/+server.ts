import { env } from '$env/dynamic/private';

const deleteOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: env.API_KEY!
  },
  body: JSON.stringify({ session_id: '[id]' })
};

export async function POST({ request }) {
  let req = await request.formData();
  const session_id = req.get("session_id")

  deleteOptions.body = JSON.stringify({ session_id: session_id })

  const deleteStatus = await fetch('https://endgrate.com/api/session/delete', deleteOptions)
    .then(response => response.json())
    .catch(err => console.error(err));

  const status = (deleteStatus.message == "Invalid or expired session." || deleteStatus.success == true)
  console.log("atempt to delete session: " + session_id + "  success:" + status)

  const response = new Response(JSON.stringify({
    status: ((status) ? "success" : "error"),
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response
}