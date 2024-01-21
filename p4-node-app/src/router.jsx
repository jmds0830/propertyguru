import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import PropertyInfoPage from './pages/PropertyInfoPage';
import BookProperty from './pages/BookProperty';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/properties',
    element: <PropertiesPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/property-info/:id',
    element: <PropertyInfoPage />,
  },
  {
    path: '/book-a-viewing',
    element: <BookProperty />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
