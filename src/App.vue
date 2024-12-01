<template>
    <NavigationBar v-if="(!isAuthPage  && !authenticatingUser)" />
    <router-view class="max-w-[120rem] mx-auto" v-slot="{ Component }">
        <transition :name="`${ !isAuthPage && 'fade' }`" mode="out-in">
            <component v-if="!authenticatingUser" :is="Component" :class="`${ !isAuthPage && 'bg-c4' }`" />
        </transition>
    </router-view>
    <Footer v-if="!isAuthPage && !authenticatingUser" />
    <LoadingScreen v-if="authenticatingUser" :loadingPrompt="'Page is Loading'" />
</template>

<script setup>
import { computed, onBeforeMount, onUnmounted, provide, reactive, ref, watch } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { authenticatingUser } from './router';
import Fuse from 'fuse.js';
import { formatDate } from './functions/formatDate';
import { useDebounceFn } from '@vueuse/core';

const route = useRoute()

const isAuthPage = computed(() => route.meta.isAuthPage)
const isAuthenticated = ref(false)

// USER
const genericProfile = ref('https://i.ibb.co/LJPrkjQ/np.png')
const userGmailName = ref('User fullname')
const users = ref([])
const posts = ref([])
const shapedPosts = ref([])
const shapedPostsCopy = ref([])
const shapedPostShallow = ref([])
const categoryTags = ref([])
const userData = reactive({
    full_name: {value: userGmailName.value, hasError: false, errorMessage: ''},
    department: {value: '', hasError: false, errorMessage: ''},
    degree_program: {value: '', hasError: false, errorMessage: ''},
    year_level: {value: '', hasError: false, errorMessage: ''},
    student_id: {value: '', hasError: false, errorMessage: ''},
    personal_description: {value: '', hasError: false, errorMessage: ''},
    experience: {value: [], hasError: false, errorMessage: ''},
    skills: {value: [''], hasError: false, errorMessage: ''},
    education: {value: {school_name: '', time_span: ''}, hasError: false, errorMessage: ''},
    interest: {value: [''], hasError: false, errorMessage: ''},
    facebook: '',
    gmail: '',
    mobileNumber: '', 
    uid: localStorage.getItem('userId'),
    photoURL: { value: genericProfile.value, scale: 100}
})

const messagesRooms = ref([])
const selectedRoom = ref()
const allMessages = ref([])
const messageRoom = ref({})
const isLoadingMessagesRooms = ref(false)
const verifiedUsers = ref(['x4xMyOXtPFYzfMZO97JM3cIuZJy2', '9ASX5ToFXfYeLnK7aztxae9n3tU2', 'mtNyuTO4gFbTLjmSROfV87NiWuI2', 'm37gTYcbIdYxNqTHllpnPm9X0rz2', '58UH3Lr6lNbC1XkdYx6iq6KvwE83'])

watch(selectedRoom, (newValue) => {
  messageRoom.value = allMessages.value.filter((room) => room.roomId === newValue.roomId)
})

const activeProjects = ref([])
const completedProjects = ref([])
const myApplications = ref([])
const postedProjects = ref([])

const unsubscribeUser = ref(null)
const unsubscribePosts = ref(null)
const unsubscribeMessagesRooms = ref(null)
const unsubscribeMessageRoom = ref(null)

const setUserData = () => {
    // console.log('setUserData', userData.uid)
    const foundUser = users.value.find((user) => user.uid === userData.uid);
    if (foundUser) {
        for (const key in userData) {
            if (userData.hasOwnProperty(key) && foundUser.hasOwnProperty(key)) {
                // Check if the current property in userData is an object with a 'value' key
                if (typeof userData[key] === 'object' && userData[key].hasOwnProperty('value') && key !== 'photoURL') {
                    userData[key].value = foundUser[key];
                } else {
                    // Directly assign to userData if it's a primitive type property
                    userData[key] = foundUser[key];
                }
            }
        }
    }
}

const fetchUsers = () =>  {
    const q = query(collection(db, "users"));
    
    let newUsers = []
    unsubscribeUser.value = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const changes = snapshot.docChanges();
      // console.log('user snapshot', snapshot);

      if (!changes.length) {
        //
      } else {
        changes.forEach((change) => {
            if(change.type === 'added') {
              newUsers.push({...change.doc.data()});
            } 
            if(change.type == 'modified') {
              newUsers = newUsers.map(user => 
                user.uid === userData.uid ? {...change.doc.data()} : user
              );
            }
        });
      }
      users.value = newUsers;
      setUserData();
      // console.log('users', users.value)
    });
}

const getUniqueTagValues = () => {
  posts.value.forEach((post) => {
    post.categoryTags.forEach((tag) => {
      if(!categoryTags.value.includes(tag)) {
        categoryTags.value.push(tag)
      }
    })
  })
}

const updateActiveProjectMembersData = () => {
  activeProjects.value = activeProjects.value.map((project) => {
    const updatedMembers = project.members.map((member) => {
      const memberData = users.value.find((user) => user.uid === member.uid);
      if (memberData) {
        return {    
          ...member,
          full_name: memberData.full_name,
          department: memberData.department,
          photoURL: memberData.photoURL, // Accessing nested photoURL value
        }
      }
      return member; // Return unchanged member if no match is found
    });

    return {
      ...project,
      members: updatedMembers,
    };
  });
};

  const updatePostedProjectApplicantsData = () => {
    postedProjects.value = postedProjects.value.map((project) => {
      const updatedApplicants = project.applicants.map((applicant) => {
        const applicantData = users.value.find((user) => user.uid === applicant.uid);
        if (applicantData) {
          return {
            ...applicant,
            full_name: applicantData.full_name,
            department: applicantData.department,
            photoURL: applicantData.photoURL, // Accessing nested photoURL value
          };
        }
        return applicant; // Return unchanged applicant if no match is found
      });

      return {
        ...project,
        applicants: updatedApplicants,
      };
    });
  }

  const filterDashboardComponents = () => {
  const userRelatedProjects = shapedPostShallow.value.filter((projectPost) => {
    // User is the author or has an "Accepted" application
    return (
      projectPost.authorId === userData.uid || 
      projectPost.applicants.some(
        (applicant) => applicant.uid === userData.uid && applicant.status === 'Accepted'
      )
    );
  });

  // Separate projects based on completion status
  activeProjects.value = [...userRelatedProjects.filter((projectPost) => !projectPost.completed)];
  completedProjects.value = [...userRelatedProjects.filter((projectPost) => projectPost.completed)];

  // User's applications excluding those authored by the user
  myApplications.value = userRelatedProjects.filter((projectPost) => {
    return (
      projectPost.authorId !== userData.uid &&
      projectPost.applicants.some(
        (applicant) => applicant.uid === userData.uid && applicant.status === 'Accepted'
      )
    );
  });

  // Projects posted by the user
  postedProjects.value = userRelatedProjects.filter(
    (projectPost) => projectPost.authorId === userData.uid
  );

  // Update additional data
  updatePostedProjectApplicantsData();
  updateActiveProjectMembersData();

  console.log('Test posted projects:', postedProjects.value);
};


const sortByDate = () => {
  shapedPostShallow.value = shapedPostShallow.value.sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime() || 0;
    const timeB = new Date(b.timestamp).getTime() || 0;

    return timeB - timeA;
  });

  shapedPostsCopy.value = shapedPostsCopy.value.sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime() || 0;
    const timeB = new Date(b.timestamp).getTime() || 0;

    return timeB - timeA;
  });
  // diri ta ma update sang dashboard component to secure recent values of the objects
  filterDashboardComponents()
}

const reshapePosts = () => {
  // append the author few details to corresponding post
  shapedPosts.value = {...posts.value.map((post) => {
      const author = users.value.find((user) => {
        if(user.uid == post.authorId) {
          return user
        }
      })
      return {...post, full_name: author.full_name, department: author.department, photoURL: author.photoURL}
    })
  }
  shapedPostShallow.value = Array.isArray(shapedPosts.value) ? [...shapedPosts.value] : [...Object.values(shapedPosts.value)];
  shapedPostsCopy.value = Array.isArray(shapedPosts.value) ? [...shapedPosts.value] : [...Object.values(shapedPosts.value)];
  sortByDate();
}

const fetchPosts = () => {
    turnOffPostsListener();

    const q = query(collection(db, "posts"));

    unsubscribePosts.value = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const changes = snapshot.docChanges();
      // console.log('post snapshot', snapshot);
      if (!changes.length) {
        // 
      } else {
        changes.forEach((change) => {
            const postData = {
                ...change.doc.data(),
                postId: change.doc.id, // Ensure unique identifier
            };
            const existingIndex = posts.value.findIndex(post => post.postId === postData.postId);
            if(change.type === 'added') {
              if (existingIndex === -1) {
                  posts.value.push(postData);
              }
            } else if (change.type === "modified") {
              
                if (existingIndex !== -1) {
                    posts.value[existingIndex] = postData;
                }
            } else if (change.type === "removed") {
                    // Remove the post
                if (existingIndex !== -1) {
                  posts.value.splice(existingIndex, 1);
                }
            }
        });
      }
      reshapePosts();
      getUniqueTagValues();
    });
}


const setLastMessage = () => { 
    messagesRooms.value = messagesRooms.value.map((thisRoom) => {
    const matchingRoom = allMessages.value.find(
      (messageRoom) => messageRoom.roomId === thisRoom.roomId
    );
    const roomMessages = matchingRoom?.roomMessages;
    if (Array.isArray(roomMessages) && roomMessages.length > 0) {
      const lastMessage = roomMessages[roomMessages.length - 1].value;
      return {
        ...thisRoom,
        lastMessage: lastMessage.length > 30 ? `${lastMessage.slice(0, 30)}...` : lastMessage
      };
    }
    return thisRoom;
  });
}


const filterOnlyUserExclusiveRooms = () => {
  // console.log('intial v', messagesRooms.value)
      messagesRooms.value = messagesRooms.value.filter((room) =>
        room.users.some(user => user.uid == userData.uid)
      ).map((thisRoom) => {
        const matchingRoom = allMessages.value.find(
                (messageRoom) => messageRoom.roomId == thisRoom.roomId
            );
            const roomMessages = matchingRoom?.roomMessages;
            if (Array.isArray(roomMessages) && roomMessages.length > 0) {
                const lastMessage = roomMessages[roomMessages.length - 1].value;
                return {...thisRoom, lastMessage: lastMessage.length > 30 ? `${lastMessage.slice(0, 30)}...` : lastMessage}
            }
            return thisRoom
      })
      setLastMessage()
      // console.log('why do you get vanished? ', messagesRooms.value)
};


const updateUsersDataInMessagesRooms = () => {
  messagesRooms.value.forEach((room) => {
    room.users = room.users.map((user) => {
      const userAccount = users.value.find((userAccount) => userAccount.uid == user.uid);
      if (userAccount) {
        // Update the user object with new data
        return { ...user, full_name: userAccount.full_name, photoURL: userAccount.photoURL };
      }
      return user;
    });
  });
  // console.log('Updated user profile in rooms:', messagesRooms.value);
};

const gatherMessages = useDebounceFn(() => {
  messagesRooms.value.forEach( async (room) => {
    const querySnapshot = await getDocs(collection(db, "messagesRooms", room.roomId, "messages"));
    let roomMessages = []
    querySnapshot.forEach((doc) => {
      roomMessages.push({...doc.data(), formattedStamp: formatDate(doc.data().timestamp), messageId: doc.id, showDeleteButton: false})
    });
    // console.log('get docs ', roomMessages)
    roomMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    allMessages.value.push({roomId: room.roomId, roomMessages: roomMessages})
    // console.log('all messages: ', allMessages.value)
    setLastMessage()
  })
}, 150)


const fetchMessagesRooms = async () => {

  if (isLoadingMessagesRooms.value) return;
  isLoadingMessagesRooms.value = true;

  turnOffMessagesRoomsListener();

  const q = query(collection(db, "messagesRooms"));
  try {
    console.log('Initializing query snapshot...');
    unsubscribeMessagesRooms.value = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const changes = snapshot.docChanges();
      
      if (!changes.length) {
        console.log('No changes in messagesRooms');
      } else {
        changes.forEach((change) => {
          if (change.type === 'added') {
            // Add new room if it doesn't already exist
            if (!messagesRooms.value.some((room) => room.roomId === change.doc.id)) {
              messagesRooms.value.push({
                ...change.doc.data(),
                roomId: change.doc.id,
              });
            }
          }
          if (change.type === 'modified') {
            // Update existing room
            if (!messagesRooms.value.some((room) => room.roomId === change.doc.id)) {
              messagesRooms.value.push({
                ...change.doc.data(),
                roomId: change.doc.id,
              });
            } else {
              messagesRooms.value = messagesRooms.value.map((room) =>
                room.roomId === change.doc.id
                ? { ...room, ...change.doc.data() }
                : room
              );
            }
          }
          if (change.type === 'removed') {
            // Remove the deleted room
            messagesRooms.value = messagesRooms.value.filter(
              (room) => room.roomId !== change.doc.id
            );
          }
        });

        // Update dependent data
        // console.log('mark all rooms:', messagesRooms.value);
        gatherMessages();
        updateUsersDataInMessagesRooms();
        filterOnlyUserExclusiveRooms();
        // console.log('Updated messagesRooms:', messagesRooms.value);
      }
    });
  } catch (error) {
    console.error('Error fetching initial messagesRooms:', error);
  } finally {
    isLoadingMessagesRooms.value = false;
  }
};


const updateRoomMessages = (newMessages) => {
  let updatedRoom = null;

  // Check if the room already exists in allMessages.value
  if (allMessages.value.some((room) => room.roomId === selectedRoom.value.roomId)) {
    allMessages.value = allMessages.value.map((room) => {
      if (room.roomId === selectedRoom.value.roomId) {
        updatedRoom = { ...room, roomMessages: newMessages };
        return updatedRoom;
      }
      return room;
    });
  } else {
    // If not, add the room to allMessages.value
    updatedRoom = { roomId: selectedRoom.value.roomId, roomMessages: newMessages };
    allMessages.value.push(updatedRoom);
  }

  // Update messageRoom.value and sort messages by timestamp
  if (updatedRoom) {
    messageRoom.value = updatedRoom;
    messageRoom.value.roomMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  console.log('snapshot triggered:', messageRoom.value);

  setLastMessage();
};



const fetchMessageRoom = () => {
    turnOffMessageRoomListener();
    
    let newMessages = []

    const q = query(collection(db, "messagesRooms", selectedRoom.value.roomId, "messages"));

    unsubscribeMessageRoom.value = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const changes = snapshot.docChanges();
      if (!changes.length) {
        // console.log('snapshot posts no content')
      } else {
        changes.forEach((change) => {
            if(change.type === 'added') {
              newMessages.push({...change.doc.data(), formattedStamp: formatDate(change.doc.data().timestamp), messageId: change.doc.id, showDeleteButton: false});
            } 
            if(change.type == 'removed') {
              newMessages = newMessages.filter((message) => message.messageId !== change.doc.id)
            }
        });
      }
      updateRoomMessages(newMessages);
    });
}

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
		"projectTitle",
		"rolePosition"
	]
};

let fuse = new Fuse(shapedPostsCopy.value, fuseOptions);

watch(shapedPostsCopy, (newValue) => {
  fuse = new Fuse(newValue, fuseOptions)
})

const filterData = (searchPattern) => {
  if(searchPattern != false) {
    let result = fuse.search(searchPattern);
    shapedPostShallow.value = result.length ? result.map(r => r.item) : [];
  } else {
    shapedPostShallow.value = shapedPostsCopy.value;
  }
}

const filterByCategoryTags = (tags) => {
  if( tags == false) {
    shapedPostShallow.value = shapedPostsCopy.value;
  } else {
    shapedPostShallow.value = shapedPostsCopy.value.filter(post => {
      // Check if there's any common element between `tags` and `post.categoryTags.value`
      return post.categoryTags.some(tag => tags.includes(tag.value));
    });
  }
}

const emptyUserData = () => {
  localStorage.setItem('userId', null)
  userData.full_name = { value: userGmailName.value, hasError: false, errorMessage: '' };
  userData.department = { value: '', hasError: false, errorMessage: '' };
  userData.degree_program = { value: '', hasError: false, errorMessage: '' };
  userData.year_level = { value: '', hasError: false, errorMessage: '' };
  userData.student_id = { value: '', hasError: false, errorMessage: '' };
  userData.personal_description = { value: '', hasError: false, errorMessage: '' };
  userData.experience = { value: [{ jobTitle: '', org: '', time_span: '' }], hasError: false, errorMessage: '' };
  userData.skills = { value: [''], hasError: false, errorMessage: '' };
  userData.education = { value: { school_name: '', time_span: '' }, hasError: false, errorMessage: '' };
  userData.interest = { value: [''], hasError: false, errorMessage: '' };
  userData.facebook = '';
  userData.gmail = '';
  userData.mobileNumber = '';
  userData.uid = null;
  userData.photoURL = { value: genericProfile.value, scale: 100 };
  localStorage.setItem('isRegistered', 'false')
} 

const findPreExistingRoom = (otherUserUid) => {
  for (const room of messagesRooms.value) {
    const hasBothUsers = room.users.some(user => user.uid === userData.uid) &&
                         room.users.some(user => user.uid === otherUserUid);

    if (hasBothUsers && room.type === "Private message") {
      console.log("found! ", room.roomId)
      return room.roomId; 
    }
  }
  return null; 
};

const runAllNecessaryFunctions = async () => {
  await fetchMessagesRooms()
  gatherMessages();
  fetchUsers();
  fetchPosts();
};

provide('userData', {
    users,
    verifiedUsers,
    posts,
    messagesRooms,
    messageRoom,
    selectedRoom,
    shapedPosts,
    shapedPostsCopy,
    shapedPostShallow,
    categoryTags,
    userData,
    genericProfile,
    userGmailName,
    authenticatingUser,
    setUserData,
    emptyUserData,
    isAuthenticated,
    filterData,
    filterByCategoryTags,
    fetchMessageRoom,
    fetchMessagesRooms,
    findPreExistingRoom,
    runAllNecessaryFunctions,
    allMessages, 
    gatherMessages,
    setLastMessage,
    activeProjects,
    completedProjects,
    myApplications,
    postedProjects
})

watch(messagesRooms.value, () => {
  if(messagesRooms.value.length) {
    gatherMessages();
    console.log('gathering..')
  }
})

onBeforeMount(() => {
  runAllNecessaryFunctions();
});

const turnOffPostsListener = () => {
  if(unsubscribePosts.value) {
        unsubscribePosts.value()
    }
}

const turnOffUsersListener = () => {
  if(unsubscribeUser.value) {
        unsubscribeUser.value()
    }
}

const turnOffMessagesRoomsListener = () => {
  if(unsubscribeMessagesRooms.value) {
        unsubscribeMessagesRooms.value()
    }
}

const turnOffMessageRoomListener = () => {
  if(unsubscribeMessageRoom.value) {
        unsubscribeMessageRoom.value()
    }
}

onUnmounted(() => {
    turnOffUsersListener();
    turnOffPostsListener();
    turnOffMessagesRoomsListener();
    turnOffMessageRoomListener();
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
