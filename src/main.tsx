import React from 'react';
import {createRoot} from 'react-dom/client';
import {ConvexReactClient} from 'convex/react';
import {ConvexAuthProvider} from '@convex-dev/auth/react';
import App from './App';
import {ServiceBoundary} from './ServiceBoundary';
import './style.css';
const client=new ConvexReactClient(import.meta.env.VITE_CONVEX_URL||'https://insightful-donkey-620.ap-southeast-2.convex.cloud');
createRoot(document.getElementById('root')!).render(<ConvexAuthProvider client={client}><ServiceBoundary><App/></ServiceBoundary></ConvexAuthProvider>);
