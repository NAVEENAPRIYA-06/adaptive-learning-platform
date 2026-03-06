import { useState, useRef, useEffect } from "react"
import Layout from "../components/Layout"
import API from "../services/api"

export default function ChatPage(){

const [message,setMessage] = useState("")
const [chat,setChat] = useState([])
const [loading,setLoading] = useState(false)

const chatEndRef = useRef(null)

useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"})
},[chat])

const sendMessage = async()=>{

if(!message.trim()) return

const userMessage = {
role:"user",
content:message
}

const updatedChat = [...chat,userMessage]

setChat(updatedChat)
setMessage("")
setLoading(true)

try{

const res = await API.post("/ai/chat",{
message
})

const aiMessage = {
role:"ai",
content:res.data.reply
}

setChat([...updatedChat,aiMessage])

}catch(err){

console.log(err)

}

setLoading(false)

}

const handleKeyPress = (e)=>{
if(e.key === "Enter"){
e.preventDefault()
sendMessage()
}
}

return(

<Layout>

<h2 className="text-3xl font-bold mb-6">
AI Tutor Chat
</h2>

<div className="bg-white rounded-xl shadow flex flex-col h-[600px]">

{/* CHAT AREA */}

<div className="flex-1 overflow-y-auto p-6 space-y-4">

{chat.map((msg,i)=>(

<div
key={i}
className={`flex ${msg.role==="user" ? "justify-end" : "justify-start"}`}
>

<div
className={`max-w-[70%] p-4 rounded-xl whitespace-pre-wrap leading-relaxed

${msg.role==="user"
? "bg-green-500 text-white"
: "bg-gray-100 text-gray-800"}

`}

>

{msg.content}

</div>

</div>
))}

{loading && (

<div className="text-gray-500">
AI is typing...
</div>
)}

<div ref={chatEndRef}/>

</div>

{/* INPUT AREA */}

<div className="border-t p-4 flex gap-3">

<input
className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
placeholder="Ask AI Tutor anything..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
onKeyDown={handleKeyPress}
/>

<button
className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
onClick={sendMessage}

>

Send </button>

</div>

</div>

</Layout>

)

}
