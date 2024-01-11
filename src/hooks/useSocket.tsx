import { SocketContext } from "@/contexts/SocketProvider"
import { useContext } from "react"

function useSocket(){
  return useContext(SocketContext)
}

export default useSocket