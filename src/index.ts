import { ResponseBuilder } from "@fermyon/spin-sdk";
import { createSSRApp } from "vue";
import { renderToString } from 'vue/server-renderer'
import App from "./App.vue";

export async function handler(req: Request, res: ResponseBuilder) {
    const app = createSSRApp(App)

    let html = await renderToString(app);
    res.send(html);
}
