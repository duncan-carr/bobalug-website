import { discord } from '$lib/database/authUtil';
import { generateState } from 'arctic';

export async function GET(event): Promise<Response> {
    const state = generateState();
    const url = discord.createAuthorizationURL(state, ["identify", "guilds.members.read"]);

    event.cookies.set("discord_oauth_state", state, {
        path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
    })

    return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}