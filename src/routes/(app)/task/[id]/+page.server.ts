import { error, redirect } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { task, template } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) return redirect(302, "/sign-in");
	const taskId = Number(event.params.id);

	if (Number.isNaN(taskId)) {
		return error(404, "Task not found");
	}

	const [result] = await db
		.select({
			id: task.id,
			titleResolved: task.titleResolved,
			descriptionResolved: task.descriptionResolved,
			objectivesResolved: task.objectivesResolved,
			agentPromptResolved: task.agentPromptResolved,
			contextResolved: task.contextResolved,
			date: task.date,
			language: task.language,
			templateType: template.type,
			templateUi: template.ui,
			templateDifficulty: template.difficulty,
			bgKnowledgeHtml: template.bgKnowledgeHtml,
			estimatedWords: template.estimatedWords,
			maxTurns: template.maxTurns,
			pointReward: template.pointReward,
			gemReward: template.gemReward,
		})
		.from(task)
		.innerJoin(template, eq(task.templateId, template.id))
		.where(and(eq(task.id, taskId), eq(task.language, user.activeLanguage as "en" | "es" | "fr" | "ja")))
		.limit(1);

	if (!result) {
		return error(404, "Task not found");
	}

	return { task: result };
};
