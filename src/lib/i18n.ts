export type LangCode = 'en' | 'es' | 'fr';

const translations: Record<LangCode, Record<string, string>> = {
	en: {
		// Nav
		'nav.home': 'Task Hall',
		'nav.profile': 'Profile',
		'nav.admin': 'Admin',
		'nav.signOut': 'Sign Out',

		// Task Hall
		'hall.thisWeek': 'This Week',
		'hall.today': 'Today',
		'hall.enter': 'Enter',
		'hall.noTasks': 'No tasks available yet.',
		'hall.difficulty': 'Difficulty',

		// Auth
		'auth.signIn': 'Sign In',
		'auth.signUp': 'Sign Up',
		'auth.email': 'Email',
		'auth.password': 'Password',
		'auth.name': 'Name',
		'auth.language': 'Language',
		'auth.forgotPassword': 'Forgot password?',
		'auth.noAccount': "Don't have an account?",
		'auth.hasAccount': 'Already have an account?',
		'auth.resetPassword': 'Reset Password',
		'auth.newPassword': 'New Password',
		'auth.sendResetLink': 'Send Reset Link',
		'auth.checkEmail': 'Check your email for a verification link.',
		'auth.verifyFailed': 'Email verification failed.',
		'auth.verified': 'Email verified! You can now sign in.',

		// Profile
		'profile.title': 'Profile',
		'profile.nickname': 'Nickname',
		'profile.timezone': 'Timezone',
		'profile.nativeLanguage': 'Native Language',
		'profile.save': 'Save',
		'profile.switchLanguage': 'Learning Language',

		// Admin
		'admin.templates': 'Templates',
		'admin.schedule': 'Schedule',
		'admin.newTemplate': 'New Template',
		'admin.editTemplate': 'Edit Template',
		'admin.scheduleTask': 'Schedule Task',

		// Common
		'common.save': 'Save',
		'common.cancel': 'Cancel',
		'common.delete': 'Delete',
		'common.create': 'Create',
		'common.edit': 'Edit',
		'common.back': 'Back',
		'common.loading': 'Loading...',
		'common.error': 'Something went wrong.'
	},
	es: {
		'nav.home': 'Salón de Tareas',
		'nav.profile': 'Perfil',
		'nav.admin': 'Admin',
		'nav.signOut': 'Cerrar Sesión',

		'hall.thisWeek': 'Esta Semana',
		'hall.today': 'Hoy',
		'hall.enter': 'Entrar',
		'hall.noTasks': 'No hay tareas disponibles aún.',
		'hall.difficulty': 'Dificultad',

		'auth.signIn': 'Iniciar Sesión',
		'auth.signUp': 'Registrarse',
		'auth.email': 'Correo electrónico',
		'auth.password': 'Contraseña',
		'auth.name': 'Nombre',
		'auth.language': 'Idioma',
		'auth.forgotPassword': '¿Olvidaste tu contraseña?',
		'auth.noAccount': '¿No tienes una cuenta?',
		'auth.hasAccount': '¿Ya tienes una cuenta?',
		'auth.resetPassword': 'Restablecer Contraseña',
		'auth.newPassword': 'Nueva Contraseña',
		'auth.sendResetLink': 'Enviar Enlace',
		'auth.checkEmail': 'Revisa tu correo para un enlace de verificación.',
		'auth.verifyFailed': 'La verificación de correo falló.',
		'auth.verified': '¡Correo verificado! Ya puedes iniciar sesión.',

		'profile.title': 'Perfil',
		'profile.nickname': 'Apodo',
		'profile.timezone': 'Zona Horaria',
		'profile.nativeLanguage': 'Idioma Nativo',
		'profile.save': 'Guardar',
		'profile.switchLanguage': 'Idioma de Aprendizaje',

		'admin.templates': 'Plantillas',
		'admin.schedule': 'Calendario',
		'admin.newTemplate': 'Nueva Plantilla',
		'admin.editTemplate': 'Editar Plantilla',
		'admin.scheduleTask': 'Programar Tarea',

		'common.save': 'Guardar',
		'common.cancel': 'Cancelar',
		'common.delete': 'Eliminar',
		'common.create': 'Crear',
		'common.edit': 'Editar',
		'common.back': 'Volver',
		'common.loading': 'Cargando...',
		'common.error': 'Algo salió mal.'
	},
	fr: {
		'nav.home': 'Salle des Tâches',
		'nav.profile': 'Profil',
		'nav.admin': 'Admin',
		'nav.signOut': 'Déconnexion',

		'hall.thisWeek': 'Cette Semaine',
		'hall.today': "Aujourd'hui",
		'hall.enter': 'Entrer',
		'hall.noTasks': 'Aucune tâche disponible pour le moment.',
		'hall.difficulty': 'Difficulté',

		'auth.signIn': 'Se Connecter',
		'auth.signUp': "S'inscrire",
		'auth.email': 'E-mail',
		'auth.password': 'Mot de passe',
		'auth.name': 'Nom',
		'auth.language': 'Langue',
		'auth.forgotPassword': 'Mot de passe oublié ?',
		'auth.noAccount': "Vous n'avez pas de compte ?",
		'auth.hasAccount': 'Vous avez déjà un compte ?',
		'auth.resetPassword': 'Réinitialiser le Mot de Passe',
		'auth.newPassword': 'Nouveau Mot de Passe',
		'auth.sendResetLink': 'Envoyer le Lien',
		'auth.checkEmail': 'Vérifiez votre e-mail pour un lien de vérification.',
		'auth.verifyFailed': "La vérification de l'e-mail a échoué.",
		'auth.verified': 'E-mail vérifié ! Vous pouvez maintenant vous connecter.',

		'profile.title': 'Profil',
		'profile.nickname': 'Surnom',
		'profile.timezone': 'Fuseau Horaire',
		'profile.nativeLanguage': 'Langue Maternelle',
		'profile.save': 'Enregistrer',
		'profile.switchLanguage': "Langue d'Apprentissage",

		'admin.templates': 'Modèles',
		'admin.schedule': 'Calendrier',
		'admin.newTemplate': 'Nouveau Modèle',
		'admin.editTemplate': 'Modifier le Modèle',
		'admin.scheduleTask': 'Planifier une Tâche',

		'common.save': 'Enregistrer',
		'common.cancel': 'Annuler',
		'common.delete': 'Supprimer',
		'common.create': 'Créer',
		'common.edit': 'Modifier',
		'common.back': 'Retour',
		'common.loading': 'Chargement...',
		'common.error': "Quelque chose s'est mal passé."
	}
};

export function t(lang: LangCode, key: string): string {
	return translations[lang]?.[key] ?? translations.en[key] ?? key;
}
