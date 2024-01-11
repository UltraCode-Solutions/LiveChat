import { useEffect } from 'react'
import useSocket from '../hooks/useSocket'

function TestSocketComponent(){
  const {socket, isSocketActive} = useSocket()

  useEffect(() => {
    socket?.emit('component-mount') // Test event to test our socket service
  }, [socket])
  return (
    isSocketActive ? <h1 className='text-green-700'>Socket activo</h1> :
    <h1 className='text-red-700'>Socket inactivo</h1>
  )
}
export default TestSocketComponent