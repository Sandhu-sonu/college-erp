export default function Navbar() {

  return (

    <header className="bg-white rounded-3xl shadow-sm px-8 py-5 flex justify-between items-center mb-8">

      <div>

        <h2 className="text-2xl font-bold text-gray-800">

          Students Management

        </h2>

        <p className="text-gray-500">

          College ERP Dashboard

        </p>

      </div>



      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold">

            Admin

          </p>

          <p className="text-sm text-gray-500">

            Administrator

          </p>

        </div>



        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">

          A

        </div>

      </div>

    </header>

  );

}