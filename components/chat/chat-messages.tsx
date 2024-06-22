import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import { FitpalAIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { FC, useContext, useState } from "react"

interface ChatMessagesProps {}

export const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  const { chatMessages, chatFileItems } = useContext(FitpalAIContext)

  const { handleSendEdit } = useChatHandler()

  const [editingMessage, setEditingMessage] = useState<Tables<"messages">>()

  return chatMessages
    .sort((a, b) => a.message.sequence_number - b.message.sequence_number)
    .map((chatMessage, index, array) => {
      const messageFileItems = chatFileItems.filter(
        (chatFileItem, _, self) =>
          chatMessage.fileItems.includes(chatFileItem.id) &&
          self.findIndex(item => item.id === chatFileItem.id) === _
      )

      return <></>
    })
}
