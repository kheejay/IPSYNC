<template>
    <div class="w-full h-fit max-h-[calc(100vh-4rem)] flex">

        <div class="h-[calc(100vh-4rem)] w-[34rem] min-w-[34rem] pl-4 py-4 pr-2 hidden lg:flex">
            <div class="w-full h-full flex flex-col gap-2.5 p-2 overflow-y-auto border border-c2">
                <div class="w-full flex gap-2">
                    <div class="flex w-full relative">
                        <input 
                        @focus="handleFocus"
                        @click="handleFocus"
                        class="h-fit flex-grow focus:outline-none p-4 resize-none caret-c2 focus:ring focus:ring-c2 text-c1
                        ring-1 ring-c3 duration-200 bg-white"
                        v-model="searchPattern"
                        @input="handleSearch"
                        placeholder="Search user"/>
                        <transition name="fade" mode="out-in">
                            <div v-if="usersTab && tempUsers.length" class="p-2 w-full h-[25rem] outline outline-c2 absolute left-0 top-full mt-2 transition duration-200 bg-c5 flex flex-col gap-2 overflow-y-auto no-scrollbar"
                                ref="target">
                                <div @click="handleCreateMessageRoom(user)" 
                                    v-for="user, index in tempUsers" :key="index"  
                                    class="w-full cursor-pointer h-[4.75rem] border-2 bg-c4 border-c2 flex items-center hover:bg-white">
                                    <div class="p-2">
                                        <img :src="user.photoURL.value" alt="profile" :class="`w-[3.5rem] h-[3.5rem] rounded-full border border-c2`">
                                    </div>
                                    <div class="pl-2">
                                        <p class="font-bold text-c1">{{ user.full_name }}</p>
                                        <p class="text-[0.90rem]">{{ user.department }}</p>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <button v-if="addGroup" @click="handleAddGroup"
                        class="text-c1 flex flex-col items-center justify-center text-[0.5rem] text-nowrap px-4 border border-c3 bg-white transition-opacity from-100% to-0% hover:bg-c2 hover:text-white active:scale-[98%] duration-200">
                        <PlusBaseline class="w-6 h-6" />
                        Add Group
                    </button>
                </div>
                <div v-if="messagesRooms.length">
                    <div v-for="(room, index) in messagesRooms" :key="index" 
                        @click="handleSetRoom(room)"
                        :class="`w-full h-[5.2rem] flex shadow-sm border cursor-pointer
                            ${(selectedRoom && selectedRoom.roomId == room.roomId) ? 'bg-gradient-to-r from-c2 to-c6' : 'bg-c4 hover:bg-white'}`">
                        <div v-if="room.type == 'Private message'" class="h-full flex items-center px-4">
                            <img :src="(room.users[0].uid != userData.uid ? room.users[0].photoURL.value : room.users[1].photoURL.value) ?? 'https://i.ibb.co/LJPrkjQ/np.png'" 
                                alt="" :class="`w-[3.5rem] h-[3.5rem] rounded-full
                                border-c6 border-2 bg-white`">
                            <!-- <img src="https://i.ibb.co/LJPrkjQ/np.png" alt="" class="w-[3.5rem] h-[3.5rem]"> -->
                        </div>
                        <div v-else-if="room.type == 'Group message'" class="h-full flex items-center px-4">
                            <img :src="(room.roomPhotoURL) ?? 'https://i.ibb.co/rfRCfwf/logo.png'" 
                                alt="" :class="`w-[3.5rem] h-[3.5rem] rounded-full
                                border-c6 border-2 bg-white`">
                        </div>
                        <div v-if="room.type == 'Private message'" :class="`flex-grow flex flex-col justify-center pb-2 gap-1 ${(selectedRoom && selectedRoom.roomId == room.roomId) ? 'text-white' : 'text-c1'}`">
                            <p class="font-bold pt-1">{{ room.users[0].uid != userData.uid ? room.users[0].full_name : room.users[1].full_name }}</p>
                            {{ room.lastMessage }}                             
                        </div>
                        <div v-else-if="room.type == 'Group message'" :class="`flex-grow flex flex-col justify-center pb-2 gap-1 ${(selectedRoom && selectedRoom.roomId == room.roomId) ? 'text-white' : 'text-c1'}`">
                            <p class="font-bold pt-1">{{ room.groupName }}</p>
                            {{ room.lastMessage }}                             
                        </div>
                    </div>
                </div>
                <div v-else class="py-4 w-full text-center text-c2 text-[1rem]">No people to show</div>
            </div>
        </div>

        <div v-if="!openMessageRoom" class="h-[calc(100vh-4rem)] w-full sm:min-w-[34rem] p-2 lg:pl-4 lg:py-4 lg:pr-2 flex lg:hidden">
            <div class="w-full h-full flex flex-col gap-2.5 p-2 overflow-y-auto border border-c2">
                <div class="w-full flex gap-2">
                    <div class="flex w-full relative">
                        <input 
                        @focus="handleFocus"
                        @click="handleFocus"
                        class="h-fit flex-grow min-w-[2rem]  focus:outline-none p-4 resize-none caret-c2 focus:ring focus:ring-c2 text-c1
                        ring-1 ring-c3 duration-200 bg-white"
                        v-model="searchPattern"
                        @input="handleSearch"
                        placeholder="Search user"/>
                        <transition name="fade" mode="out-in">
                            <div v-if="usersTab && tempUsers.length" class="p-2 w-full h-[25rem] outline outline-c2 absolute left-0 top-full mt-2 transition duration-200 bg-c5 flex flex-col gap-2 overflow-y-auto no-scrollbar"
                                ref="target">
                                <div @click="handleCreateMessageRoom(user)" 
                                    v-for="user, index in tempUsers" :key="index"  
                                    class="w-full cursor-pointer h-[4.75rem] border-2 bg-c4 border-c2 flex items-center hover:bg-white">
                                    <div class="p-2">
                                        <img :src="user.photoURL.value" alt="profile" :class="`w-[3.5rem] h-[3.5rem] rounded-full border border-c2`">
                                    </div>
                                    <div class="pl-2">
                                        <p class="font-bold text-c1">{{ user.full_name }}</p>
                                        <p class="text-[0.90rem]">{{ user.department }}</p>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <button v-if="addGroup" @click="handleAddGroup"
                        class="text-c1 flex flex-col items-center justify-center text-[0.5rem] text-nowrap px-4 border border-c3 bg-white transition-opacity from-100% to-0% hover:bg-c2 hover:text-white active:scale-[98%] duration-200">
                        <PlusBaseline class="w-6 h-6" />
                        Add Group
                    </button>
                </div>
                <div v-if="messagesRooms.length">
                    <div v-for="(room, index) in messagesRooms" :key="index" 
                        @click="handleSetRoomMobile(room)"
                        :class="`w-full h-[5.2rem] flex shadow-sm border cursor-pointer
                            ${(selectedRoom && selectedRoom.roomId == room.roomId) ? 'bg-gradient-to-r from-c2 to-c6' : 'bg-c4 hover:bg-white'}`">
                        <div v-if="room.type == 'Private message'" class="h-full flex items-center px-4">
                            <img :src="(room.users[0].uid != userData.uid ? room.users[0].photoURL.value : room.users[1].photoURL.value) ?? 'https://i.ibb.co/LJPrkjQ/np.png'" 
                                alt="" :class="`w-[3.5rem] h-[3.5rem] rounded-full
                                border-c6 border-2 bg-white`">
                            <!-- <img src="https://i.ibb.co/LJPrkjQ/np.png" alt="" class="w-[3.5rem] h-[3.5rem]"> -->
                        </div>
                        <div v-if="room.type == 'Private message'" :class="`flex-grow flex flex-col justify-center pb-2 gap-1 ${(selectedRoom && selectedRoom.roomId == room.roomId) ? 'text-white' : 'text-c1'}`">
                            <p class="font-bold pt-1">{{ room.users[0].uid != userData.uid ? room.users[0].full_name : room.users[1].full_name }}</p>
                           {{ room.lastMessage }}                             
                        </div>
                        <div v-else-if="room.type === 'Group message'" :class="`font-bold pl-4 text-[1rem] ${(selectedRoom && selectedRoom.roomId == room.roomId) ? 'text-white' : 'text-c1'} flex items-center w-full`">
                            {{ room.groupName }}
                        </div>
                    </div>
                </div>
                <div v-else class="py-4 w-full text-center text-c2 text-[1rem]">No people to show</div>
            </div>
        </div>

        <div v-if="openMessageRoom" class="flex-grow h-[calc(100vh-4rem)] w-full lg:h-auto lg:w-auto flex p-2 sm:p-4 lg:p-0 lg:pl-2 lg:py-4 lg:pr-4">
            <div class="border border-c6 flex-grow flex flex-col">

                <div class="w-full min-h-[4rem] h-[4rem] flex justify-start bg-gradient-to-r from-c2 to-c6 drop-shadow relative z-[1]">
                    <div v-if="selectedRoom && selectedRoom.type === 'Private message'" class="h-full flex">
                        <div class="h-full flex lg:hidden items-center px-4">
                            <ArrowLeft class="w-8 h-8 text-c5" @click="hideMessageRoom" />
                        </div>
                        <div class="flex items-center lg:pr-2 lg:pl-4">
                            <img @click="seeUser(selectedRoom.users[0].uid != userData.uid ? selectedRoom.users[0].uid : selectedRoom.users[1].uid)" :src="selectedRoom.users[0].uid != userData.uid ? selectedRoom.users[0].photoURL.value : selectedRoom.users[1].photoURL.value ?? 'https://i.ibb.co/LJPrkjQ/np.png'" alt="profile" :class="`w-11 h-11 cursor-pointer rounded-full`">
                        </div>
                        <div class="flex items-center px-2.5 lg:text-[1.125rem] text-white">
                            {{ selectedRoom.users[0].uid != userData.uid ? selectedRoom.users[0].full_name : selectedRoom.users[1].full_name ?? 'IPSYNC User' }}
                        </div>
                    </div>
                    <div v-else-if="selectedRoom && selectedRoom.type === 'Group message'"
                        class="h-full flex items-center justify-between w-full pl-4 text-[1.125rem] font-semibold text-white relative">
                        <div class="h-full flex lg:hidden items-center xs:px-4">
                            <ArrowLeft class="w-8 h-8 text-c5" @click="hideMessageRoom" />
                        </div>
                        <div class="flex items-center gap-2 lg:gap-4">
                            <img :src="selectedRoom.roomPhotoURL ?? 'https://i.ibb.co/rfRCfwf/logo.png'" alt="profile" :class="`w-11 h-11 rounded-full`">
                            {{ selectedRoom.groupName }}
                        </div>
                        <DotsVertical @click="toggleGroupChatSettings" class="mr-4 w-7 h-7 cursor-pointer " />
                        <div v-if="openGroupChatSettings" class="absolute p-2 right-12 w-[15rem] h-max bg-white top-[105%]" ref="targetGroupChatSetting">
                            <button @click="handleSeeGroupUsers" 
                                class="bg-c2 p-2 text-center w-full active:bg-c6">See users!</button>
                            <button @click="handleShowManageUsers" v-if="selectedRoom.groupAdminId === userData.uid" class="bg-c2 p-2 text-center w-full active:bg-c6 mt-2">Manage Users</button>
                        </div>
                    </div>
                    <div v-else class="h-full flex items-center px-4 lg:text-[1.125rem] text-white">
                        <ArrowLeft class="w-8 h-8 block lg:hidden text-c5 mr-4" @click="hideMessageRoom" />
                        IPSYNC Message</div>
                </div>

                <div class="flex-grow flex flex-col p-2 overflow-y-scroll text-white gap-4 no-scrollbar"
                    ref="chatBox">
                    <div v-if="!selectedRoom" class="flex-grow flex items-center justify-center text-[#91add5]">
                        {{ 'Select a chat' }}
                    </div>
                    <div v-else-if="messageRoom && messageRoom?.roomMessages?.length"
                        v-for="message, index in messageRoom.roomMessages" :key="index" :class="`w-full flex ${ message.author_uid != userData.uid ? 'justify-start' : 'justify-end' }`">
                        <div :class="`flex-col flex ${ message.author_uid != userData.uid ? 'items-start' : 'items-end'}`">
                            <div v-if="message.author_uid != userData.uid" class="flex text-black items-center">
                                <img @click="seeUser(message.author_uid)" 
                                    :src="message.author_photoURL.value" alt="" class="w-4 h-4 rounded-full mb-[0.25rem] mr-[0.35rem] border cursor-pointer hover:scale-125 duration-200">
                                <p class="text-[0.8rem] font-semibold">{{ message.author_name.split(" ")[0] }}</p>
                            </div>
                            <div @click="toggleDeleteButton(message.messageId)" v-if="message.type === 'Text'" class="flex flex-wrap gap-1 items-center relative cursor-pointer">
                                <span v-if="message.showDeleteButton && message.author_uid === userData.uid" @click="handleDeleteMessage(message.messageId)" class="text-[0.60rem] text-nowrap absolute px-2 shadow cursor-pointer -bottom-[1.125rem] left-1/2 -translate-x-1/2 bg-c6 text-white">Delete message</span>
                                <div class="w-fit max-w-[39rem] bg-c2 py-2 px-6 text-wrap">
                                    {{ message.value }}
                                </div>
                            </div>
                            <div v-else-if="message.type === 'Photo'" @click="toggleDeleteButton(message.messageId)" class="bg-c5 p-2 cursor-pointer relative">
                                <span v-if="message.showDeleteButton" @click="handleDeleteMessage(message.messageId)" class="text-[0.60rem] text-nowrap absolute text-black p-2 shadow bg-white cursor-pointer -left-[7rem]">Delete message</span>
                                <img :src="message.value" alt="Image" class="h-max max-h-[11rem]">
                            </div>
                            <div :class="`text-[0.60rem] text-c1 w-full ${message.author_uid != userData.uid ? 'text-start' : 'text-end'} py-[0.25rem]`">
                                <span>{{ message.formattedStamp }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="messageRoom && !messageRoom?.roomMessages?.length && selectedRoom" class="flex-grow text-[#91add5] flex items-center justify-center">
                        IPSYNC Message Room
                    </div>
                </div>

                <div class="w-full p-2 flex flex-col justify-start items-end bg-transparent to-c6 gap-4">
                    <div v-if="photoBucket.length && !photoLoading" 
                        class="h-max flex-wrap w-full bg-c5 border border-c2 flex justify-end p-4 gap-4">
                        <div v-for="photo, index in photoBucket" :key="index" class="w-max h-max relative">
                            <XIcon @click="handleRemoveImage(index)" class="w-7 h-7 -right-[0.75rem] -top-[0.75rem] absolute z-[1] drop-shadow rounded-full cursor-pointer active:translate-y-[0.125rem]" />
                            <img :src="photoURL[index]" alt=""  class="max-h-[5rem] sm:max-h-[9rem] bg-c4 drop-shadow rounded">
                        </div>
                    </div>
                    <div v-else-if="photoLoading" class="h-max w-full flex items-center flex-col px-1 text-c1">
                        <p class="text-xs">Uploading photo</p>
                        <BarScale class="h-7 w-7" />
                    </div>
                    <div class="w-full flex items-end">
                        <textarea
                            ref="textarea"
                            v-model="input"
                            @keyup.enter="handleSendMessage"
                            class="resize-none w-full p-4 outline-none max-h-[10rem] caret-c2 text-c1 
                            hover:ring-[0.125rem] focus:ring-[0.25rem] ring-c2"
                            placeholder="Type message"
                        />
                        <div class="flex items-center h-[3.3rem] justify-center relative overflow-hidden w-[4rem] text-c2 hover:text-c1 active:translate-y-[0.125rem] duration-200">
                            <input @change="addPhoto" 
                                :disabled="0" type="file" accept="image/*" class="w-[180%] h-[180%] opacity-0 bottom-0 bg-c1 absolute cursor-pointer outline">
                            <PlusIcon class="w-9 h-9 cursor-wait hover:text-c6 hover:scale-105 
                            duration-200 active:translate-y-[0.125rem]" />
                        </div>
                        <button  @click="handleSendMessage"
                        class="px-4 sm:px-9 h-[3.25rem] bg-c6 text-white rounded hover:bg-[hsl(215,52%,38%)] duration-75 
                        active:translate-y-[0.125rem]">
                            Send
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <LoadingScreen :loadingPrompt="loadingPrompt" v-if="isLoading" />
        <transition name="fade" mode="out-in">
            <div v-if="addGroupForm" class="fixed w-screen h-screen top-0 left-0 z-[2] flex items-start pt-[4rem] justify-center">
                <div class="fixed w-screen h-screen top-0 left-0 bg-c2 opacity-45"></div>
                <div class="w-[32rem] px-2.5 sm:px-0">
                    <div class="w-full h-max p-2 sm:p-8 bg-c4 relative drop-shadow text-c1 border">
                        <XIcon @click="handleCloseAddGroup" class="absolute right-2 top-2 drop-shadow rounded-full sm:w-7 sm:h-7 w-5 h-5 active:translate-y-[0.125rem] cursor-pointer duration-200" />
                        <div class="w-full flex justify-start gap-2 flex-col">
                            <label class="text-xs sm:text-base" for="groupName">Group Name</label>
                            <input class="text-[1.25rem] sm:text-[1.5rem] p-2 outline-c2" id="groupName" type="text" v-model="groupName" ref="groupNameField">
                        </div>
                        <div class="flex w-full justify-normal gap-2 mt-2 flex-col">
                            <label class="text-xs sm:text-base" for="users">Add Users</label>
                            <input @focus="showAddGroupUsers" @click="showAddGroupUsers"
                                class="text-[1.25rem] sm:text-[1.5rem] p-2 outline-c2" id="users" type="search"
                                placeholder="Type to search" v-model="searchPatternAddGroupUsers" @input="handleSearchAddGroupUsers">
                        </div>  
                        <button v-if="groupUsers.length" @click="handleCreateGroup"
                            class="w-full text-[1.25rem] h-[3rem] bg-c2 mt-4 text-white active:translate-y-[.125rem] duration-200">Create Now!</button>  
                        <div v-if="tempUsers.length && addGroupUsers" class="p-2 w-full h-[12rem] outline outline-c2 absolute left-0 top-full mt-2 transition duration-200 bg-c5 flex flex-col gap-2 overflow-y-auto"
                            ref="targetAddGroupUsers">
                            <div
                                v-for="user, index in tempUsers" :key="index"  
                                class="w-full cursor-pointer h-[4.75rem] border-2 bg-c4 border-c2 flex items-center hover:bg-white">
                                <div class="p-2">
                                    <img :src="user.photoURL.value" alt="profile" :class="`w-[2.5rem] h-[2.5rem] sm:w-[3.5rem] sm:h-[3.5rem] rounded-full border border-c2`">
                                </div>
                                <div class="pl-2">
                                    <p class="text-sm sm:text-base font-bold text-c1">{{ user.full_name }}</p>
                                    <p class="text-[0.75rem] sm:text-[0.90rem]">{{ user.department }}</p>
                                </div>
                                <div class="flex-grow flex justify-end">
                                    <button v-if="!groupUsers.includes(user)" @click="groupUsers.push(user)"
                                        class="py-1 px-4 mr-[0.75rem] text-white bg-c2 text-sm active:translate-y-[0.125rem]">Add</button>
                                    <Check v-else class="mr-4 rounded-full w-5 h-5 p-[0.125rem] bg-[hsl(207,44%,89%)] text-white" />
                                </div>
                            </div>
                        </div>            
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="openGroupUsers" class="fixed w-screen h-screen top-0 left-0 z-[2] flex items-center justify-center">
                <div class="fixed w-screen h-screen top-0 left-0 bg-c2 opacity-45"></div>
                <div class="w-[30rem]  h-[25rem] z-[1] px-2">
                    <div v-if="selectedRoom.users.length" class="p-2 border bg-c5 border-c2 flex flex-col gap-2 overflow-y-auto"
                        ref="targetOpenGroupUsers">
                        <div class="w-full text-center text-c1 text-[1.5rem] font-semibold sticky top-0 py-2 bg-white">{{ selectedRoom.groupName }}</div>
                        <div
                            v-for="user, index in selectedRoom.users" :key="index"  
                            class="w-full h-[4.75rem] border-2 bg-c4 border-c2 flex items-center hover:bg-white">
                            <div class="p-2">
                                <img @click="seeUser(user.uid)" :src="user.photoURL.value" alt="profile" :class="`w-[2.5rem] h-[2.5rem] sm:w-[3.5rem] sm:h-[3.5rem] rounded-full cursor-pointer border border-c2`">
                            </div>
                            <div class="pl-2">
                                <p class="text-sm sm:text-base font-bold text-c1">{{ user.full_name }}</p>
                            </div>
                            <div v-if="user.uid === selectedRoom.groupAdminId" class="flex-grow flex justify-end">
                                <span class="text-c1 px-4">Admin</span>
                            </div>
                        </div>
                    </div>  
                </div>  
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="openManageUsers" class="fixed w-screen h-screen top-0 left-0 z-[2] flex items-center justify-center">
                <div class="fixed w-screen h-screen top-0 left-0 bg-c2 opacity-45"></div>
                <div class="px-1.5 w-[32rem] h-[32rem] sm:h-[36rem] z-[2] ">
                    <div class="w-full h-full bg-white text-c1 flex flex-col p-2">
                        <div class="w-full px-2 sm:px-4 py-2.5 flex justify-between items-center">
                            <p class="text-c2 font-semibold">Manage Group Users!</p>
                            <XIcon @click="closeManageUsers" class="w-6 h-6 drop-shadow rounded-full cursor-pointer active:translate-y-[0.125rem]" />
                        </div>
                        <div class="w-full flex">
                            <button @click="handleManageAddUsers" :class="`py-2 w-1/2 ${ manageAddUsers ? 'bg-c2 text-white border-0' : 'border-2'}`">Add Users!</button>
                            <button @click="handleManageRemoveUsers" :class="`py-2 w-1/2 ${ !manageAddUsers ? 'bg-c2 text-white border-0' : 'border-2'}`">Remove User</button>
                        </div>
                        <div class="flex-grow bg-c2 py-2 overflow-y-auto flex flex-col px-1">
                            <div v-if="manageAddUsers">
                                <div class="w-full h-[2.5rem] sm:h-[3rem] bg-white focus-within:border-c6 focus-within:border-2">
                                    <input type="text" class="sm:text-[1.125rem] focus:outline-none bg-transparent w-full h-full px-2" placeholder="Type to search"
                                    v-model="searchPatternManageUser" @input="handleSearchManageUsers">
                                </div>
                                <div class="flex-grow mt-1 overflow-y-auto">
                                    <div
                                        v-for="user, index in addUsersContainerManageUsers" :key="index"  
                                        class="w-full h-[4.75rem] border-2 bg-c4 border-c2 flex items-center hover:bg-white">
                                        <div class="p-2">
                                            <img @click="seeUser(user.uid)" :src="user.photoURL.value" alt="profile" :class="`w-[2.5rem] h-[2.5rem] sm:w-[3.5rem] sm:h-[3.5rem] rounded-full cursor-pointer border border-c2`">
                                        </div>
                                        <div class="pl-2">
                                            <p class="text-sm sm:text-base font-bold text-c1">{{ user.full_name }}</p>
                                            <p class="text-[0.75rem] sm:text-[0.90rem]">{{ user.department }}</p>
                                        </div>
                                        <div class="flex-grow flex justify-end">
                                            <button v-if="!usersToAddContainer.includes(user)" @click="usersToAddContainer.push(user)"
                                                class="py-1 px-4 mr-[0.75rem] text-white bg-c2 text-sm active:translate-y-[0.125rem]">Add</button>
                                            <Check v-else class="mr-4 rounded-full w-5 h-5 p-[0.125rem] bg-[hsl(207,44%,89%)] text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div
                                    v-for="user, index in manageUserRoomUsers" :key="index"  
                                    class="w-full h-[4.75rem] border-2 bg-c4 border-c2 flex items-center hover:bg-white">
                                    <div class="p-2">
                                        <img @click="seeUser(user.uid)" :src="user.photoURL.value" alt="profile" :class="`w-[2.5rem] h-[2.5rem] sm:w-[3.5rem] sm:h-[3.5rem] rounded-full cursor-pointer border border-c2`">
                                    </div>
                                    <div class="pl-2">
                                        <p class="text-sm sm:text-base font-bold text-c1">{{ user.full_name }}</p>
                                        <p class="text-[0.75rem] sm:text-[0.90rem]">{{ user.department }}</p>
                                    </div>
                                    <div class="flex-grow flex justify-end">
                                        <button v-if="!usersToRemoveContainer.includes(user)" @click="usersToRemoveContainer.push(user)"
                                            class="py-1 px-4 mr-[0.75rem] text-white bg-font text-sm active:translate-y-[0.125rem]">Remove</button>
                                        <XIcon v-else class="mr-4 rounded-full w-5 h-5 p-[0.125rem] bg-[hsl(207,44%,89%)] text-white" />
                                    </div>
                                </div>
                                <div v-if="!manageUserRoomUsers.length" class="w-full text-center text-wrap py-4">
                                    There is no user in the room
                                </div>
                            </div>
                        </div>
                        <div class="w-full bg-white">
                            <button @click="handleUpdateManageUsers" 
                                class="w-full p-2 text-c2 border mt-1.5 border-c2 hover:bg-c2 hover:text-white active:translate-y-[0.125rem] duration-200">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue';
import ArrowLeft from '../components/icons/ArrowLeft.vue';
import PlusIcon from '../components/icons/PlusIcon.vue'
import { onClickOutside, useDebounceFn, useTextareaAutosize, useFocus } from '@vueuse/core';
import { toast } from '../functions/toast';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import uploadPhoto from '../functions/uploadPhoto';
import XIcon from '../components/icons/XIcon.vue';
import BarScale from '../components/icons/BarScale.vue';
import PlusBaseline from '../components/icons/PlusBaseline.vue';
import Fuse from 'fuse.js';
import LoadingScreen from '../components/LoadingScreen.vue';
import { useRouter } from 'vue-router';
import Check from '../components/icons/Check.vue'
import DotsVertical from '../components/icons/DotsVertical.vue';

const openMessageRoom = ref(true)

const hideMessageRoom = useDebounceFn(() => {
    openMessageRoom.value = false
}, 150)

const showMessageRoom = useDebounceFn(() => {
    openMessageRoom.value = true
}, 150)

const { textarea, input } = useTextareaAutosize()
const groupNameField = ref()
const { focused } = useFocus(groupNameField)

const { messagesRooms, selectedRoom, userData, fetchMessageRoom, fetchMessagesRooms, messageRoom, users, findPreExistingRoom } = inject('userData')

const handleSetRoom = (room) => {
    console.log("mark room ghere", room)
    selectedRoom.value = room;
    fetchMessageRoom()
}

const handleSetRoomMobile = (room) => {
    selectedRoom.value = room;
    showMessageRoom()
    fetchMessageRoom()
}

const textButtonLock = ref(false)
const photoButtonLock = ref(false)
const buttonLockUpdateManageUsers = ref(false)

const photoURL = ref([])
const photoBucket = ref([])

const handleRemoveImage = useDebounceFn((index) => {
    photoBucket.value.splice(index, 1)
    photoURL.value.splice(index, 1)
})

const addPhoto = (event) => {
    const file = event.target.files[event.target.files.length - 1]
    if (file) {
        photoURL.value.push(URL.createObjectURL(file));
        photoBucket.value.push(file)
    }
}

const photoLoading = ref(false)

const sendPhotoMessage = async (newPhotoURL) => {
    try {
        const docRef = await addDoc(collection(db, "messagesRooms", selectedRoom.value.roomId, "messages"), {
            type: "Photo",
            value: newPhotoURL,
            timestamp: new Date().toISOString(),
            author_name: userData.full_name,
            author_photoURL: userData.photoURL,
            author_uid: userData.uid
        }); 
        console.log('nm phtot id ', docRef.id)
    } catch (error) {
        toast('Error occurred while sending message', "top", 5000, '#CB3D3D', '#B74242')
    }
}

const sendPhoto = async () => {
    photoLoading.value = true;
    photoButtonLock.value = true;

    try {
        // Create an array of upload promises
        const uploadPromises = photoBucket.value.map(async (photo) => {
        const tempPhotoURL = await uploadPhoto(photo);
        if (tempPhotoURL) {
            await sendPhotoMessage(tempPhotoURL);
        }
        });

        // Wait for all uploads and message sends to complete
        await Promise.all(uploadPromises);

        // Clear the photo bucket and reset states
        photoBucket.value = [];
    } catch (error) {
        toast('Error occurred while uploading photo', "top", 5000, '#CB3D3D', '#B74242')
    } finally {
        photoButtonLock.value = false;
        textButtonLock.value = false;
        photoLoading.value = false;
    }
};


const sendMessage = async () => {
    if(input.value != undefined && input.value != false && !textButtonLock.value) {
        textButtonLock.value = true;
        try {
            let message = input.value;
            input.value = '';
            const docRef = await addDoc(collection(db, "messagesRooms", selectedRoom.value.roomId, "messages"), {
                type: "Text",
                value: message,
                timestamp: new Date().toISOString(),
                author_name: userData.full_name.value,
                author_photoURL: userData.photoURL,
                author_uid: userData.uid
            }); 
            console.log('new message id ', docRef.id)
            console.log(messageRoom.value)
        } catch (error) {
            toast('Error occurred while sending message', "top", 5000, '#CB3D3D', '#B74242')
        } finally {
            textButtonLock.value = false;
        }
    }
}

const handleSendMessage = () => {
    if(input.value != undefined && input.value != false && !textButtonLock.value) {
        sendMessage()
    }
    if(photoBucket.value.length && photoBucket.value != false && !photoButtonLock.value) {
        sendPhoto()
    }
}

const searchPattern = ref('')
const tempUsers = ref(users.value.filter((user) => user.uid != userData.uid))

const addGroup = ref(true)

const showAddGroup = useDebounceFn(() => {
    addGroup.value = true;
}, 250)

const hideAddGroup = useDebounceFn(() => {
    addGroup.value = false;
}, 150)

const usersTab = ref(false)

const hideUsersTab = useDebounceFn(() => {
    usersTab.value = false;
}, 0)

const showUsersTab = useDebounceFn(() => {
    usersTab.value = true;
}, 200)

const handleFocus = () => {
    if(addGroup.value && !usersTab.value) {
        hideAddGroup()
        showUsersTab()
    }
}

const handleClickOutside = () => {
    hideUsersTab()
    showAddGroup()
    searchPattern.value = ''
}

const target = ref(null)
onClickOutside(target, event => handleClickOutside())

const fuseOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		"full_name",
		"department"
	]
};

let fuse = new Fuse(users.value, fuseOptions);

watch(users, (newValue) => {
  fuse = new Fuse(newValue, fuseOptions)
})

const filterUsers = (searchPattern) => {
  if (searchPattern != false) {
    // console.log(searchPattern)
    let result = fuse.search(searchPattern); // Search using Fuse.js
    tempUsers.value = result.length
      ? result.map(r => r.item).filter(user => user.uid != userData.uid)
      : []; // Extract matching items\
      console.log('users: ', users.value)
      console.log('result: ', result)
      console.log('tempUsers : ', result)
  } else {
    tempUsers.value = [...users.value.filter((user) => user.uid != userData.uid)]; 
  } 
};


const handleSearch = useDebounceFn(() => {
    filterUsers(searchPattern.value)
}, 300)

const isLoading = ref(false)
const loadingPrompt = ref('Processing request')

const startLoading = (prompt = 'Processing request') => {
    isLoading.value = true;
    loadingPrompt.value = prompt;
}

const stopLoading = () => {
    isLoading.value  = false;
}

const groupUsers = ref([])
const groupName = ref('New Group')
const addGroupForm = ref(false)
const addGroupUsers = ref(false)
const searchPatternAddGroupUsers = ref('')
const buttonLockAddGroup = ref(false)

const handleSearchAddGroupUsers = useDebounceFn(() => {
    filterUsers(searchPatternAddGroupUsers.value)
}, 300)

const handleCreateGroup = async () => {
    addGroupForm.value = false
    try {
        if(buttonLockAddGroup.value) {
            return
        }
        buttonLockAddGroup.value = true
        startLoading('System is generating room')
        const groupMessageRoom = {
            users: [...groupUsers.value.map((user) => {
                return {uid: user.uid, photoURL: user.photoURL, full_name: user.full_name}
            }), 
            {uid: userData.uid, photoURL: userData.photoURL, full_name: userData.full_name.value}],
            type: "Group message",
            isNew: true,
            groupName: groupName.value,
            groupAdminId: userData.uid
        }
        console.log('mark addgroup data', groupMessageRoom)
        const docRef = await addDoc(collection(db, "messagesRooms"), groupMessageRoom)
        fetchMessageRoom()
        console.log('msgs rooms', messagesRooms.value)
        console.log("Document written with ID: ", docRef.id);   
    } catch (error) {
        toast('Error occurred while creating a room', "top", 5000, '#CB3D3D', '#B74242')
        stopLoading();
    } finally {
        handleCloseAddGroup()
        stopLoading();
        buttonLockAddGroup.value = false;
    }

}

const handleAddGroup = useDebounceFn(() => {
    addGroupForm.value = true;
    setTimeout(() => focused.value = true, 50)
}, 200)

const handleCloseAddGroup = useDebounceFn(() => {
    addGroupForm.value = false;
    groupName.value = 'New Group';
    groupUsers.value = [];
    searchPatternAddGroupUsers.value = ''
}, 200)

const showAddGroupUsers = useDebounceFn(() => {
    addGroupUsers.value = true
}, 200)

const hideAddGroupUsers = useDebounceFn(() => {
    addGroupUsers.value = false
}, 200)

const handleClickOutsideAddGroupUsers = () => {
    hideAddGroupUsers()
}

const targetAddGroupUsers = ref(null)
onClickOutside(targetAddGroupUsers, event => handleClickOutsideAddGroupUsers())

const router = useRouter()

const seeUser = (userId) => {
    userData.uid !== userId ? router.push(`/inspect-profile/${ userId }`) : router.push({ name: 'Profile'})
}

const handleCreateMessageRoom = async (user) => {
    handleClickOutside();
    const preExistingRoomId = findPreExistingRoom(user.uid)
    if(preExistingRoomId != null) {
        selectedRoom.value = messagesRooms.value.find((room) => room.roomId === preExistingRoomId)
    } else {
        startLoading('System is generating room')
        if(user.uid && user.uid !== userData.uid) {
            try {
                const messageRoom = {
                    users: [
                        {uid: user.uid, photoURL: user.photoURL, full_name: user.full_name},
                        {uid: userData.uid, photoURL: userData.photoURL, full_name: userData.full_name.value}
                    ],
                    type: "Private message",
                    isNew: true,
                }
                const docRef = await addDoc(collection(db, "messagesRooms"), messageRoom)
                fetchMessagesRooms() 
            } catch (error) {
                toast('Error occurred while creating a room', "top", 5000, '#CB3D3D', '#B74242')
                stopLoading();
            } finally {
                stopLoading();
            }
        } else {
            stopLoading();
            toast('Error occurred while creating a room', "top", 5000, '#CB3D3D', '#B74242')
        }
    }
}

const toggleDeleteButton = useDebounceFn((messageId) => {
    console.log(messageRoom.value)
    messageRoom.value = {...messageRoom.value, roomMessages: messageRoom.value.roomMessages.map((message) => 
        message.messageId === messageId 
        ? { ...message, showDeleteButton: !message.showDeleteButton } 
        : message
    )}
}, 150);

const handleDeleteMessage = async (messageId) => {
    try {
        await deleteDoc(doc(db, "messagesRooms", selectedRoom.value.roomId, "messages", messageId))
    } catch (error) {
        toast('Error occurred while deleting message', "top", 5000, '#CB3D3D', '#B74242')
    }
}

const openGroupChatSettings = ref(false)
const openGroupUsers = ref(false)

const targetGroupChatSetting = ref(null)
onClickOutside(targetGroupChatSetting, event => toggleGroupChatSettings())
const targetOpenGroupUsers = ref(null)
onClickOutside(targetOpenGroupUsers, event => toggleOpenGroupUsers())

const toggleGroupChatSettings = useDebounceFn(() => {
    openGroupChatSettings.value = !openGroupChatSettings.value
}, 150)

const toggleOpenGroupUsers = useDebounceFn(() => {
    openGroupUsers.value = !openGroupUsers.value
}, 150)

const chatBox = ref(null);

const bottomView = useDebounceFn(() => {
    if (chatBox.value) {
        chatBox.value.scrollTo({
            top: chatBox.value.scrollHeight,
            behavior: "smooth",
        });
    }
}, 150)

const handleSeeGroupUsers = () => {
    toggleGroupChatSettings()
    toggleOpenGroupUsers()
}

const manageAddUsers = ref(true)
const openManageUsers = ref(false)
const addUsersContainerManageUsers = computed(() => {
    return tempUsers.value.filter((user) => {
        return !selectedRoom.value.users.some((roomUser) => roomUser.uid === user.uid);
    });
});
const manageUserRoomUsers = computed(() => {
    return selectedRoom.value.users.filter((user) => {
        return user.uid !== userData.uid
    })
})

const usersToAddContainer = ref([])
const usersToRemoveContainer = ref([])
const searchPatternManageUser = ref('')

const handleSearchManageUsers = useDebounceFn(() => {
    filterUsers(searchPatternManageUser.value)
}, 150)

const closeManageUsers = useDebounceFn(() => {
    openManageUsers.value = false
    usersToAddContainer.value = []
    usersToRemoveContainer.value = []
    searchPatternManageUser.value = ''
}, 150)

const showManageUsers = useDebounceFn(() => {
    openManageUsers.value = true
}, 150)

const openManageAddUsers = useDebounceFn(() => {
    manageAddUsers.value = true
}, 150)

const hideManageAddUsers = useDebounceFn(() => {
    manageAddUsers.value = false
}, 150)

const handleShowManageUsers = () => {
    showManageUsers()
    toggleGroupChatSettings()
}

const handleManageAddUsers = () => {
    if(manageAddUsers.value) {
        return
    }
    openManageAddUsers()
}


const handleManageRemoveUsers = () => {
    if(!manageAddUsers.value) {
        return
    }
    hideManageAddUsers()
}

const handleUpdateManageUsers = async () => {
    startLoading('Processing request')
    openManageUsers.value = false;
    try {
        if(buttonLockUpdateManageUsers.value) {
            return
        }
        buttonLockUpdateManageUsers.value = true
        const docRef = doc(db, "messagesRooms", selectedRoom.value.roomId);
        const updateUsers = [
            ...usersToAddContainer.value,
            ...manageUserRoomUsers.value.filter((user) => {
                return !usersToRemoveContainer.value.some((roomUser) => roomUser.uid === user.uid);
            }),
            ...selectedRoom.value.users.filter((user) => {
                return user.uid === userData.uid
            })
        ];
        await updateDoc(docRef, {
            users: updateUsers
        });
        selectedRoom.value = {...selectedRoom.value, users: updateUsers}
    } catch (error) {
        toast('Error occurred while processing request', "top", 5000, '#CB3D3D', '#B74242')
    } finally {
        stopLoading()
        closeManageUsers()
        buttonLockUpdateManageUsers.value = false
    }
}

watch(messageRoom, () => {
    bottomView();
});

</script>

<style scoped>
.fade-enter-active {
    transition: opacity 200ms;
}
.fade-enter-from {
    opacity: 0; /* End state */
}
</style>