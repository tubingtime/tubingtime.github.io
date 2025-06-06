import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), staticReload()]
});


function staticReload() {
	return {
		name: 'static-reload',
		enforce: 'post' as const,
		handleHotUpdate({ file, server }: any) {
			if (file.endsWith('.css')) {
				server.ws.send({
					type: 'full-reload',
					path: '*'
				});
			}
		}
	};
}