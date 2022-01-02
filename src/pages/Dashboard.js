import React, { useState } from 'react';
import { ethers } from 'ethers'
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Assets from '../partials/dashboard/Assets';
import {useSelector} from 'react-redux'

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentAccount = useSelector(state => state.currentUser)

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {currentAccount.loggedIn ? (
            <div>
            <WelcomeBanner />
            <div className="grid grid-cols-12 gap-6">
              <Assets />
            </div>
            </div>
            ) : (
            <img/>
          )}

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;