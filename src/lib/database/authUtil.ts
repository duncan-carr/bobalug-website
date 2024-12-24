import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { supabase } from "./supabaseClient";
import type { RequestEvent } from "@sveltejs/kit";
import { Discord } from "arctic";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "$env/static/private";

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
    const {error} = await supabase.from("user_session").insert({ id: session.id, user_id: session.userId, expires_at: session.expiresAt.toISOString() });
	console.log(error)
    return session
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const { data: sessionData, error } = await supabase.from("user_session").select("*").eq("id", sessionId).single();
    if (error || !sessionData) {
        return { session: null, user: null };
    }
    
    const session: Session = {
        id: sessionData.id,
        userId: sessionData.user_id,
        expiresAt: new Date(sessionData.expires_at)
    }

    if (Date.now() >= session.expiresAt.getTime()) {
        await supabase.from("user_session").delete().eq("id", session.id);
        return { session: null, user: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await supabase.from("user_session").update({ expires_at: session.expiresAt.toISOString() }).eq("id", session.id);
    }

    const { data: userData, error: userError } = await supabase.from("app_user").select("*").eq("id", session.userId).single();
    if (userError || !userData) {
        return { session: null, user: null };
    }

	const user: User = {
		id: userData.id,
		discordId: userData.discord_id,
		username: userData.username,
		avatar: userData.discord_avatar
	}

    return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
    await supabase.from("user_session").delete().eq("id", sessionId);
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		expires: expiresAt,
		path: "/"
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set("session", "", {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/"
	});
}

export async function getUserFromDiscordId(discordId: string): Promise<User | null> {
	const { data: userData, error } = await supabase.from("app_user").select("*").eq("discord_id", discordId).single();
	if (error || !userData) {
		return null;
	}

	const user: User = {
		id: userData.id,
		discordId: userData.discord_id,
		username: userData.username,
		avatar: userData.discord_avatar
	}

	return user;
}

export async function getUserFromUsername(username: string): Promise<User | null> {
	const { data: userData, error } = await supabase.from("app_user").select("*").eq("username", username).single();
	if (error || !userData) {
		return null;
	}

	const user: User = {
		id: userData.id,
		discordId: userData.discord_id,
		username: userData.username,
		avatar: userData.discord_avatar
	}

	return user;
}

export async function createUser(discordId: string, username: string, avatar: string | null): Promise<User> {
	const { error } = await supabase.from("app_user").insert({ discord_id: discordId, username, discord_avatar: avatar }).single();

	console.log(discordId, username)
	console.log(error)

	if (error) {
		throw new Error("Failed to create user");
	}

	const { data: userData } = await supabase.from("app_user").select("*").eq("discord_id", discordId).single();

	if (!userData) {
		throw new Error("Failed to find created user");
	}

	const user: User = {
		id: userData.id,
		discordId: userData.discord_id,
		username: userData.username,
		avatar: userData.discord_avatar
	}

	return user;
}


export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

export interface User {
	id: number;
	discordId: string;
	username: string;
	avatar: string | null;
}

export const discord = new Discord(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, "http://localhost:5173/login/discord/callback");