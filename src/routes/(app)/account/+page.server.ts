import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (locals.user === null) {
        throw redirect(308, '/login');
    }

    return { user: locals.user };
}