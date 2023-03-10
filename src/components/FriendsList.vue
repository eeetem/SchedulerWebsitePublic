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
      let friends = document.createElement("li");
      friends.innerHTML += friendList[friendListKey];
      document.getElementById('friends').appendChild(friends);
      console.log(friendList);
    }
  });
</script>

<style scoped>

</style>