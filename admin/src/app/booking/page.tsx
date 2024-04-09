import Bookings from "@/components/bookings/Booking";

export default function BookingsPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
          </div>
        </div>
        <div className="mt-10">
          <Bookings />
        </div>
      </div>
    </>
  );
}
