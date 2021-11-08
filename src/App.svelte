<script>
  import { Router, Link, Route } from "svelte-routing";
  import NavBar from "./lib/NavBar.svelte";

  import Home from "./routes/Home.svelte";
  import Cart from "./routes/Cart.svelte";
  import WishList from "./routes/WishList.svelte";



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