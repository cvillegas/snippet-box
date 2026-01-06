import { Router } from 'express';
import {
  countTags,
  createSnippet,
  deleteSnippet,
  exportSnippets,
  getAllSnippets,
  getRawCode,
  getSnippet,
  importSnippets,
  searchSnippets,
  updateSnippet
} from '../controllers/snippets';
import { requireBody } from '../middleware';

export const snippetRouter = Router();

snippetRouter
  .route('/')
  .post(requireBody('title', 'language', 'code'), createSnippet)
  .get(getAllSnippets);

// Static routes MUST come before dynamic :id routes
snippetRouter.route('/statistics/count').get(countTags);
snippetRouter.route('/search').post(searchSnippets);
snippetRouter.route('/export').get(exportSnippets);
snippetRouter.route('/import').post(importSnippets);
snippetRouter.route('/raw/:id').get(getRawCode);

// Dynamic :id routes come last
snippetRouter
  .route('/:id')
  .get(getSnippet)
  .put(updateSnippet)
  .delete(deleteSnippet);
