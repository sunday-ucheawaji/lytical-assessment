"use client";
import { store } from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";
import NavBar from "./navbar";
import SideBar from "./sidebar";
import SubNav from "./subNav";
import SideBarMobile from "./sidebarMobile";

const AppWrapper = ({ childrenProp }: { childrenProp: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <div className="h-screen w-full">
          <NavBar />
          <div className="flex h-[90%]">
            <SideBar />
            <div className="w-full md:w-[80%]">
              <SubNav />
              {childrenProp}
            </div>
          </div>
          
            <SideBarMobile/>
        </div>
      </Provider>
    </div>
  );
};

export default AppWrapper;
