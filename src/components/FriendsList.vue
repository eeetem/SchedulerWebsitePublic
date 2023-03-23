<template>
  <div id="friends">
  </div>
</template>

<script>
import {getFunctions, httpsCallable} from "firebase/functions";
import app from "@/api/firebase";
const functions = getFunctions(app);
export default {
  name: "FriendsList"
}
  const friendsRequest = httpsCallable(functions, 'GetFirends');
  friendsRequest().then((result) => {
    const friendList = result.data;
    for (const friendListKey in friendList ) {
        const dataRequest = httpsCallable(functions, 'GetUserData');
        dataRequest({userid: friendList[friendListKey]}).then((result) => {
          const userdata = result.data;
          let friends = document.createElement("li");// creating the elements
          let friendsPfp = document.createElement("img");
          let friendsName = document.createTextNode(userdata['username']);
          friendsPfp.style.height = "75px";
          friendsPfp.style.width = "75px";
          friendsPfp.classList.add("rounded-circle");
          friendsPfp.src += userdata['pfpURL'];
          friends.classList.add("list-group-item");
          friends.classList.add("list-group-item-action");
          friends.appendChild(friendsPfp);
          friends.appendChild(friendsName);
          document.getElementById('friends').appendChild(friends);
      });
    }
    document.getElementById('spinner').remove();
  });
</script>

<style scoped>

</style>