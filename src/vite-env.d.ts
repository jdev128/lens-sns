/// <reference types="vite/client" />

interface ViteTypeOptions {
	// By adding this line, you can make the type of ImportMetaEnv strict
	// to disallow unknown keys.
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly VITE_BACKEND_BASE_URL: string;
	readonly VITE_BACKEND_POST_PATH: string;
	readonly VITE_BACKEND_COMMENT_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
