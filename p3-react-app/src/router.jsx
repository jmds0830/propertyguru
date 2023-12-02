import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MangaPage from './pages/MangaPage';
import ChapterPage from './pages/ChapterPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: ':mangaId',
    element: <MangaPage />,
  },
  {
    path: ':mangaId/read',
    element: <ChapterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
