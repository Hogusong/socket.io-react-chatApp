import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
import MdEject from 'react-icons/lib/md/eject'

export default class SideBar extends Component {
  render() {
    const { user, chats, activeChat, setActiveChat, leaveRoom } = this.props;
    return (
      <div className="side-bar">
        <div className='bar-header'>
          <div className='bar-title'>Our Cool Chat <FAChevronDown /></div>
          <div className='bar-menu'><FAMenu /></div>
        </div>
        <div className='search'>
          <i className='search-icon'><FASearch /></i>
          <input type='text' placeholder='search' />
          <div className='plus'>+</div>
        </div>
        <div className='chats'  ref='chats'
              onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null)}} >
          {console.log('in sidebar', chats)}
          { 
            chats.map((chat) => {
              console.log(chat, (!chat.name))
              console.log(chat.name)
              if (chat.name) {
                const lastMessage = chat.messages[chat.messages.length-1];
                const user = chat.users.find(({ name }) => {
                  return name !== this.props.name
                }) || { name: 'Community' }
                const classNames = (activeChat && activeChat._id === chat._id) ? 'active' : '';
                console.log('className:', user, classNames )
                return (
                  <div key={chat._id} className={`user ${classNames}`}
                        onClick={ ()=> { setActiveChat(chat) }}>
                    <div className='user-photo'>{user.name[0].toUpperCase()}</div>
                    <div className='user-info'>
                      <p className='user-name'>{user.name}</p>
                      {lastMessage && <p id='last-messgae'>{lastMessage.message}</p>}
                    </div>
                  </div>
                )
              }
              return null;
            })
          }
        </div>
        <div className='current-user'>
          <span>User : {user.name}</span>
          <div className='leave' title='Leave from current Room' onClick={() => leaveRoom()}>
            <MdEject />
          </div>
        </div>
      </div>
    );
  }
}
