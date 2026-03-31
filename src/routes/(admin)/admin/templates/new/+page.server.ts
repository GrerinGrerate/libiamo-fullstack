import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { templateSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import { template } from '$lib/server/db/schema';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const raw = Object.fromEntries(formData);

		const result = templateSchema.safeParse(raw);
		if (!result.success) {
			return fail(400, { errors: result.error.flatten().fieldErrors, values: raw });
		}

		await db.insert(template).values({
			...result.data,
			createdBy: event.locals.user!.id
		});

		return redirect(302, '/admin/templates');
	}
};
