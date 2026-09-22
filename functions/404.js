import {notFound} from '../lib/editorial.mjs';import {finish} from '../lib/public-blog.mjs';
export function onRequest({request}){return finish(request,notFound(),404);}
