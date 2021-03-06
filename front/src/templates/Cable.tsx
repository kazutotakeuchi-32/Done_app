import React from 'react'
import { ActionCableConsumer } from '@thrash-industries/react-actioncable-provider'

type Props = {
  room: {
    id: number
    created_at: Date
    updated_at: Date
  }
  onReceived: (e:any) => void
}

export const Cable = ({ room, onReceived }: Props) => {
  return (
    <ActionCableConsumer
      key={room.id}
      channel={{ channel: 'MessagesChannel', room_id: room.id }}
      // onReceivedのイベント発火した且つ受信者がチャネルに接続していたタイミングで、
      // 動的に既読に置き換える
      onReceived={onReceived}
    />
  )
}
