import { deleteSessionTokenCookie, invalidateSession } from '$lib/database/authUtil';
import { supabase } from '$lib/database/supabaseClient.js';
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
	},
	save: async (event) => {
		const user = event.locals.user;
		if (event.locals.session === null || user === null) {
			return fail(401);
		}
		
		const data = await event.request.formData();

		const firstName = data.get('first_name') as string;
		const lastName = data.get('last_name') as string;
		const showName = (data.get('show_name') as string === 'on') ? true : false;
		const birthday = data.get('birthday') as string;
		const showBirthday = (data.get('show_birthday') as string === 'on') ? true : false;
		const country = data.get('country') as string;
		const about = data.get('about') as string;

		console.log(firstName, lastName, showName, birthday, showBirthday, country, about);

		const { error } = await supabase.from('app_user').update({ first_name: firstName, last_name: lastName, show_name: showName, birthday: birthday, show_birthday: showBirthday, country: country, about: about }).eq('id', user.id);
		if (error) {
			console.log(error)
		}
		return redirect(302, "/account");
	}
};