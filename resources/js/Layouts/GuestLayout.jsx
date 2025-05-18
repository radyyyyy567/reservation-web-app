import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className=" flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 h-screen fixed top-0 z-50 w-full">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mt-4 sm:max-w-md w-full">
                {children}
            </div>
        </div>
    );
}
