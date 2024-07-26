import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client'

import PulpTicketApp from './PulpTicketApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PulpTicketApp />
    </React.StrictMode>,
)