<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from 'svelte'
  import NavBar from "./lib/NavBar.svelte";

	import { user } from '$store/store'
	import { db,provider,auth } from '$store/firebase'
 	import { getAuth, onAuthStateChanged } from "firebase/auth";

  import Home from "./routes/Home.svelte";
  import Cart from "./routes/Cart.svelte";
  import WishList from "./routes/WishList.svelte";

  let userInfo;


	onMount(()=>{
		onAuthStateChanged(auth, (user) => {
		  if (user) {
			userInfo = user
		  } else {
			userInfo = null;
		  }
		});
	})

	$: if(userInfo){
		$user = userInfo;
	}else{
		$user = null;
	}

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <NavBar />
  </nav>
  <div>
    <Route path="/" component="{Home}"></Route>
    <Route path="cart" component="{Cart}" />
    <Route path="wish-list" component="{WishList}" />
  </div>
</Router>