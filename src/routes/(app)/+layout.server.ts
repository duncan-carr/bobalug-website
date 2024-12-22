export async function load({ locals, fetch }) {
    const user = locals.user;
    if (!user) {
        return { user: null };
    }

    

    return { user: locals.user };
}