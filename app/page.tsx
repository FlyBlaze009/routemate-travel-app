import { auth } from '@/auth';
import AuthButton from '@/components/AuthButton';
import GlobeClient from '@/components/Globe';

const HomePage = async () => {
  const session = await auth();
  return (
    <div className="w-screen px-4 bg-accent h-screen">
      <div className="flex flex-col items-center justify-center gap-6 2xl:grid 2xl:grid-cols-2 2xl:gap-12 mx-auto h-full">
        <div className="hidden 2xl:flex justify-center items-center overflow-hidden">
          <GlobeClient />
        </div>

        <div className="flex flex-col items-center justify-center text-center h-full mr-6">
          <h2 className="text-4xl font-bold mb-4">The Travel Planner App</h2>
          <p className="text-2xl font-light text-gray-600 text-center">
            Discover new horizons, craft your perfect trip, and navigate the
            world effortlessly with our intuitive travel planner built for
            explorers like you.
          </p>
          <AuthButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
