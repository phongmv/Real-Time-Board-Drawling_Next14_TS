import Image from 'next/image'

const Logo = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image className="animate-pulse duration-700" src="/logo.png" alt="logo" width={120} height={120} />
    </div>
  )
}

export default Logo
