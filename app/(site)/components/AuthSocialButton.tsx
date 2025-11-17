import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';

import { IconType } from "react-icons";
interface AuthSocialButtonProps {
	icon: IconType,
	className: string,
	onClick : () => void
}

const AuthSocialButton = ({
	icon: Icon,
	className,
	onClick
} : AuthSocialButtonProps) => {
	return (
		<Button type="button" onClick={onClick}  className={cn("inline-flex cursor-pointer w-full justify-center shadow-md  text-gray-500  rounded-sm bg-white py-2 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 px-4", className)} >
			<Icon />
		</Button>
	)
}

export default AuthSocialButton;