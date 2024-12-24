import { deleteSessionTokenCookie, invalidateSession } from '$lib/database/authUtil';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (locals.user === null) {
        throw redirect(308, '/login');
    }

    return { user: locals.user };
}

export const actions = {
	logout: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, "/");
	}
};