<template>
  <div id="friends">
    <div id="addFriendsButton" style="display: none;">
    <div style="text-align: center; padding-top: 10px;" class="blockquote">
      You have no friends added!
      <div style="padding: 30px;">
        <button type="button" class="btn btn-info" @click="searchFriendInput">Add Friends</button>
      </div>
    </div>
    </div>

    <div id="searchInput" style="display: none; margin: auto;">
      <div style="text-align: center; padding: 10px;" class="blockquote">Add Friend</div>
      <div class="input-group mb-3" style="width:300px; margin: auto;">
        <input id="friendName" type="text" class="form-control" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addFriends">Add</button>
      </div>
    </div>
  </div>
  <div id="addButtonActive" style="display: none; padding: 10px">
    <div class="input-group mb-3" style="width:250px; margin: auto;">
      <input id="friendNameSelection" type="text" class="form-control" placeholder="Add Friend" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addFriends">Add</button>
    </div>
  </div>
</template>

<script>
import {httpsCallable, getFunctions} from "firebase/functions";
import app from "@/api/firebase";
import {getAuth} from "firebase/auth";

const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;

export default {
  name: "FriendsList",
  data() {
    return {}
  },
  mounted() {
    this.friendsListLoad()
  },
  methods: {
    friendsListLoad(){
      const friendsRequest = httpsCallable(functions, 'GetFirends');
      friendsRequest().then((result) => {
        const friendList = result.data;
        if (friendList.length != 0) {
          for (const friendListKey in friendList) {
            const dataRequest = httpsCallable(functions, 'GetUserData');
            dataRequest({userid: friendList[friendListKey]}).then((result) => {
              const userdata = result.data;
              let friends = document.createElement("a");// creating the elements
              let friendsPfp = document.createElement("img");
              let friendsName = document.createTextNode(userdata['username']);
              friendsPfp.style.height = "75px";
              friendsPfp.style.width = "75px";
              friendsPfp.classList.add("rounded-circle");
              friendsPfp.src += userdata['pfpURL'];
              friends.classList.add("list-group-item");
              friends.classList.add("list-group-item-action");
              friends.addEventListener("click",function(){
                const friendUID = userdata['username'];
                console.log(friendUID);
              });
              friends.classList.add("list-group-item");
              friends.classList.add("list-group-item-action");
              friends.setAttribute("href","/friendsProfile"+"?"+userdata['username']);
              friends.appendChild(friendsPfp);
              friends.appendChild(friendsName);
              friends.style.border = "hidden";
              friends.classList.add("h6");
              document.getElementById('friends').appendChild(friends);
              document.getElementById("addButtonActive").style.display = 'block';
            });
          }
        } else {
          document.getElementById("addFriendsButton").style.display = 'block';
        }
        document.getElementById('spinner').remove();
      });

    },
    searchFriendInput() {
      document.getElementById("addFriendsButton").style.display = 'none';
      document.getElementById("searchInput").style.display = 'block';
    },

    addFriends(){
      let name = document.getElementById("friendName").value;
      if(name == ""){
        name = document.getElementById("friendNameSelection").value;
      }
      console.log("NAME:" + name);
      const addFriendRequest = httpsCallable(functions, 'AddFriend');
      addFriendRequest(name).then((result) => {
        console.log(result.data);
      });
    },
  }
}
</script>

<style scoped>

</style>