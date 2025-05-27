import { ModalProvider } from '@/Components/Utils/ModalContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Home from './Home';

export default function Demo({ auth }) {
    return (
        <ModalProvider>
            <Home user={auth.user}/>
        </ModalProvider>
    );
}
  