<template>
  <div id="friends">
    <li></li>
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
    let friends = document.getElementById("friends");
    friends.innerHTML += friendList;
    console.log(friendList);
  });
</script>

<style scoped>

</style>