// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { User, Session } from "$lib/database/authUtil";

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}

export {};
