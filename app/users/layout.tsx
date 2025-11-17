
import Sidebar from "../components/SideBar";
import React, { ReactNode } from "react";
const UserLayout = ({ children }: { children: ReactNode }) => {
	return (
		//  @ts-expect-error Server Component
		<Sidebar>
			<div className="h-full">
				{children}
			</div>
		</Sidebar>
	)
}

export default UserLayout