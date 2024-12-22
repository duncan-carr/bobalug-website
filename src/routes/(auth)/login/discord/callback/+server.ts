import { createSession, createUser, discord, generateSessionToken, getUserFromDiscordId, setSessionTokenCookie } from "$lib/database/authUtil.js";
import type { OAuth2Tokens } from "arctic";

export async function GET(event): Promise<Response> {
    const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("discord_oauth_state") ?? null;

    console.log(code, state, storedState);

    if (code === null || state === null || storedState === null) {
		return new Response("Something is wrong with code, state, or storedState", {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response("State does not equal stored state", {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
    try {
		tokens = await discord.validateAuthorizationCode(code);
	} catch (e) {
		// Invalid code or client credentials
		return new Response("Invalid code or client credentials", {
			status: 400
		});
	}

    const discordUserResponse = await fetch("https://discord.com/api/v10/users/@me", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`
        }
    })
    const discordUser = await discordUserResponse.json();
    const discordId: string = discordUser.id;
    const discordUsername: string = discordUser.username;
    const discordAvatar: string | null = discordUser.avatar;

    const existingUser = await getUserFromDiscordId(discordId);

    if (existingUser) {
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, existingUser.id)
        setSessionTokenCookie(event, sessionToken, session.expiresAt)

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        })
    }

    const user = await createUser(discordId, discordUsername, discordAvatar);

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id)
    setSessionTokenCookie(event, sessionToken, session.expiresAt)

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/"
        }
    })
}