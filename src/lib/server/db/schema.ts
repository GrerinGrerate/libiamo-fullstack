import { relations, sql } from "drizzle-orm";
import { boolean, check, date, index, integer, jsonb, pgTable, primaryKey, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { languageCodeEnum, scheduleOriginEnum, taskDurationEnum, taskTypeEnum, uiVariantEnum } from "./enums";

// ── userLearningProfile ──────────────────────────────────────────────
export const userLearningProfile = pgTable(
	"user_learning_profile",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		language: languageCodeEnum("language").notNull(),
		levelSelfAssign: integer("level_self_assign").default(2).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(t) => [primaryKey({ columns: [t.userId, t.language] }), check("level_check", sql`${t.levelSelfAssign} >= 1 AND ${t.levelSelfAssign} <= 3`)],
);

// ── template ─────────────────────────────────────────────────────────
export const template = pgTable(
	"template",
	{
		id: serial("id").primaryKey(),
		isActive: boolean("is_active").default(true).notNull(),
		language: languageCodeEnum("language").notNull(),
		type: taskTypeEnum("type").notNull(),
		ui: uiVariantEnum("ui").notNull(),
		duration: taskDurationEnum("duration").notNull(),

		titleBase: text("title_base").notNull(),
		shortObjectiveBase: text("short_objective_base"),
		descriptionBase: text("description_base"),
		objectivesBase: jsonb("objectives_base"),
		agentPromptBase: text("agent_prompt_base"),
		agentPersonaPool: jsonb("agent_persona_pool"),
		bgKnowledgeHtml: text("bg_knowledge_html"),
		candidates: jsonb("candidates"),

		maxTurns: integer("max_turns"),
		estimatedWords: integer("estimated_words"),
		difficulty: integer("difficulty").notNull(),
		pointReward: integer("point_reward").notNull(),
		gemReward: integer("gem_reward").notNull(),

		lastScheduledAt: timestamp("last_scheduled_at").defaultNow().notNull(),
		createdBy: text("created_by").references(() => user.id),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(t) => [
		uniqueIndex("template_id_language_idx").on(t.id, t.language),
		check("difficulty_check", sql`${t.difficulty} >= 1 AND ${t.difficulty} <= 3`),
	],
);

// ── task ─────────────────────────────────────────────────────────────
export const task = pgTable(
	"task",
	{
		id: serial("id").primaryKey(),
		templateId: integer("template_id")
			.notNull()
			.references(() => template.id),
		language: languageCodeEnum("language").notNull(),
		date: date("date").notNull(),
		origin: scheduleOriginEnum("origin").notNull(),

		titleResolved: text("title_resolved").notNull(),
		shortObjectiveResolved: text("short_objective_resolved"),
		descriptionResolved: text("description_resolved"),
		objectivesResolved: jsonb("objectives_resolved"),
		agentPromptResolved: text("agent_prompt_resolved"),
		contextResolved: jsonb("context_resolved"),

		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [uniqueIndex("task_date_template_idx").on(t.date, t.templateId), index("task_language_date_idx").on(t.language, t.date)],
);

// ── Relations ────────────────────────────────────────────────────────
export const userLearningProfileRelations = relations(userLearningProfile, ({ one }) => ({
	user: one(user, {
		fields: [userLearningProfile.userId],
		references: [user.id],
	}),
}));

export const templateRelations = relations(template, ({ one, many }) => ({
	createdByUser: one(user, {
		fields: [template.createdBy],
		references: [user.id],
	}),
	tasks: many(task),
}));

export const taskRelations = relations(task, ({ one }) => ({
	template: one(template, {
		fields: [task.templateId],
		references: [template.id],
	}),
}));

export * from "./auth.schema";
// Re-export
export * from "./enums";
