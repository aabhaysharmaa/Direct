import { cn } from '@/lib/utils'
import React from 'react'

const AuthLoader = ({className} : {classname? : string}) => {
  return (
	<div className={cn("w-6 h-6 border-3 border-gray-200 border-t-[#73C2E6]  rounded-full animate-spin mx-auto",className)}></div>

  )
}

export default AuthLoader