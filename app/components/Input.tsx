"use client";
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface CustomInputProps {
	label: string,
	id: string,
	type?: string
	required?: string
	register: UseFormRegister<FieldValues>,
	errors: FieldErrors,
	disabled?: boolean,
	className?: string
}

const CustomInput = ({
	label,
	id,
	type,
	register,
	required,
	errors,
	disabled,
	className
}: CustomInputProps) => {
	return (
		<div className="mt-2 py-2 ">
			<label className='text-md font-semibold text-gray-900 ' htmlFor={id}>{label}</label>
			<Input id={id} type={type} autoComplete={id} disabled={disabled} {...register(id, { required })} className={cn("block text-sm  leading-6 w-full mt-1 font-semibold text-gray-900 placeholder:text-gray-900 ring-gray-300 sm:text-sm sm:leading-6 focus:ring-sky-600 shadow-sm ring-1 ring-inset focus:ring-2", errors[id] && "focus:ring-rose-500", disabled && "opacity-50 cursor-not-allowed", className)}></Input>
		</div>
	)
}

export default CustomInput