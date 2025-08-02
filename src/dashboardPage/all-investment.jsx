import React from "react";
import DashboardLayout from "./dashboardLayout";
import '../styles.css'

function AllInvestments({username, email}){

  return(
    <>
     <div className="navigate-bars"> 
      <DashboardLayout username={username} email={email}/>     
      <div className="main">
        <div className="dashbord-ccontainer">
          <h2 className="text-white font-bold text-xl mb-5">All Recent Investment</h2>

          <div className="flex flex-col item-center account-container w-full overflow-y-scroll h-80 mx-auto md:overflow-x-scroll">
            <table className="min-w-full border-none">
              <thead>
                <tr className="odd:bg-slate-50 even:bg-white">
                  <th className="font-medium px-8 py-3 text-left uppercase">Plans</th>
                  <th className="font-medium px-8 py-3 text-left uppercase">Who</th>
                  <th className="font-medium px-8 py-3 text-left uppercase">Date</th>
                  <th className="font-medium px-8 py-3 text-left uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Plan on progress */}
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 active:bg-slate-200 w-full">
                  <td className="flex item-center px-8 text-slate-500 py-3 md-w-full whitespace-nowrap ">
                    <p className="bg-slate-500 text-white py-2 px-3 rounded-full text-sm">P1</p>
                    <p className="py-2 px-2 text-sm">Silver - Daily 4.76% for 21 Days</p>
                  </td>
                  <td className="px-8 text-slate-500 py-1">username</td>
                  <td className="px-8 text-slate-500 py-1">18/10/2024</td>
                  <td className=" flex px-8 gap-1 text-slate-500 py-1 whitespace-nowrap ">
                    <p>1.0940 BTC</p>
                    <div className="w-40 bg-gray-200 rounded-full h-1 dark:bg-gray-700 my-2 ml-4 shadow">
                      <div className="h-1 w-40 bg-blue-600 rounded-full shadow" style={{width: '65%'}}></div>
                    </div>
                    {/* <input type="range"/> */}
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 active:bg-slate-200 w-full">
                  <td className="flex item-center px-8 text-slate-500 py-3 md-w-full whitespace-nowrap ">
                    <p className="bg-slate-500 text-white py-2 px-3 rounded-full text-sm">P2</p>
                    <p className="py-2 px-2 text-sm">Silver - Daily 4.76% for 21 Days</p>
                  </td>
                  <td className="px-8 text-slate-500 py-1">username</td>
                  <td className="px-8 text-slate-500 py-1">18/10/2024</td>
                  <td className=" flex px-8 gap-1 text-slate-500 py-1 whitespace-nowrap ">
                    <p>1.0940 BTC</p>
                    <div className="w-40 bg-gray-200 rounded-full h-1 dark:bg-gray-700 my-2 ml-4 shadow">
                      <div className="h-1 w-40 bg-blue-600 rounded-full shadow" style={{width: '65%'}}></div>
                    </div>
                    {/* <input type="range"/> */}
                  </td>
                </tr>

                {/* plan Completed */}
                <tr className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 active:bg-slate-200 w-full">
                  <td className="flex item-center px-8 text-slate-500 py-3 md-w-full whitespace-nowrap ">
                    <p className="bg-slate-500 text-white py-2 px-3 rounded-full text-sm">P3</p>
                    <p className="py-2 px-2 text-sm">Silver - Daily 4.76% for 21 Days</p>
                  </td>
                  <td className="px-8 text-slate-500 py-1">username</td>
                  <td className="px-8 text-slate-500 py-1">18/10/2024</td>
                  <td className=" flex px-8 gap-1 text-slate-500 py-1 whitespace-nowrap ">
                    <p>1.0940 BTC</p>
                    <p className="ml-4 font-medium text-green-600">Completed</p>
                    {/* <input type="range"/> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* copyright seciton  */}
          <div className="dashboard-copyright-div">
            <p>All Rights Reserved © Pennywise FX 2025</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AllInvestments;