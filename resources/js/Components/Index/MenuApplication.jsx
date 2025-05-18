import React from "react";

const MenuApplication = () => {
    return (
        <div className="flex flex-col items-center h-full justify-center">
          <div className="text-4xl font-bold my-4">Can we serve you with..</div>
            <div className="grid grid-cols-2 gap-4 bg-orange-200 p-4 rounded-lg">
                <button className="shadow card bg-sky-100 relative h-[250px] w-[200px] p-4 flex flex-col items-center justify-start space-y-2">
                    <div className="absolute z-10 flex items-center justify-center h-full w-full">
                        <div className="rounded-full h-28 w-28 bg-sky-300"></div>
                    </div>
                    <img
                        src="/static/Menu.svg"
                        alt="Menu"
                        className="w-full h-full relative z-20"
                    />
                    <span className="text-center font-medium">Menu</span>
                </button>

                <button className="shadow card bg-sky-100 relative h-[250px] w-[200px] p-4 flex flex-col items-center justify-start space-y-2">
                    <div className="absolute z-10 flex items-center justify-center h-full w-full">
                        <div className="rounded-full h-28 w-28 bg-sky-300"></div>
                    </div>
                    <img
                        src="/static/Dinein.svg"
                        alt="Dine In"
                        className="w-full h-full relative z-20"
                    />
                    <span className="text-center font-medium">Dine In</span>
                </button>

                <button className="shadow card bg-sky-100 relative h-[250px] w-[200px] p-4 flex flex-col items-center justify-start space-y-2">
                    <div className="absolute z-10 flex items-center justify-center h-full w-full">
                        <div className="rounded-full h-28 w-28 bg-sky-300"></div>
                    </div>
                    <img
                        src="/static/Reservation.svg"
                        alt="Reservation"
                        className="w-full h-full relative z-20"
                    />
                    <span className="text-center font-medium">Reservation</span>
                </button>

                <button className="shadow card bg-sky-100 relative h-[250px] w-[200px] p-4 flex flex-col items-center justify-start space-y-2">
                    <div className="absolute z-10 flex items-center justify-center h-full w-full">
                        <div className="rounded-full h-28 w-28 bg-sky-300"></div>
                    </div>
                    <img
                        src="/static/Takeaway.svg"
                        alt="Takeaway"
                        className="w-full h-full relative z-20"
                    />
                    <span className="text-center font-medium">Takeaway</span>
                </button>
            </div>
        </div>
    );
};

export default MenuApplication;
