import React, { ReactNode } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
interface CustomButtonProps {
	type?: "button" | "reset" | "submit",
	children?: ReactNode,
	onClick?: () => void,
	danger: string,
	disabled: boolean,
	className: string,
	socialButtonColor: string
}

const CustomButton = ({
	type,
	children,
	danger,
	disabled,
	className,
	socialButtonColor
}: CustomButtonProps) => {
	return (
		<Button className={cn("w-full bg-[#73C2E6]  hover:bg-sky-500 font-bold  focus-visible:outline-offset-2  focus-visible:outline-2   px-3 py-2  flex items-center rounded-md text-md cursor-pointer", disabled && "opacity-50 cursor-not-allowed", danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600", socialButtonColor && "hover:bg-gray-400", className)} type={type} disabled={disabled} >
			{children}
		</Button>
	)
}

export default CustomButton;