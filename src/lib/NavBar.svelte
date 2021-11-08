<script>
  	import { Link} from "svelte-routing";

	import SvelteTooltip from 'svelte-tooltip';
	const getLoc = async () =>{
		const res = await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=f970ab993e5f46a39a956232f3f1c4f0");
		return(await res.json());
	}
</script>
<nav class="h-[60px] w-full flex items-center bg-[#131921] !text-gray-100">
	<div class="w-full flex items-center justify-between space-x-10 mx-auto px-4">
		<Link to="/">
			<img class="h-8 mt-1.5" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon" />
		</Link>
		<div class="cursor-default leading-tight text-sm flex items-start flex-col">
			<p class="text-xs ml-1 opacity-80">Deliver to</p>
			<SvelteTooltip tip="Based on IP Address" bottom color="#131921">
				<p class="font-semibold flex items-center space-x-1">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					{#await getLoc()}
						<span>Getting Location...</span>
					{:then result}	
						<span>{result?.city},{result?.postal_code}</span>
					{/await}
					<!-- <span>Tanuku,534211</span> -->
				</p>
			</SvelteTooltip>
		</div>
		<div class="flex-1">
			<form class="flex items-center">
				<input type="text" class="rounded-l focus:outline-none rounded-none w-full px-2 py-2 text-[#131921]">
				<button class="rounded-r bg-[#febd69] py-2.5 w-10 flex items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#131921]" viewBox="0 0 20 20" fill="currentColor">
					  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
					</svg>
				</button>
			</form>
		</div>
		<div class="flex items-center space-x-5">
			<div class="leading-tight text-sm flex items-start flex-col">
				<p class="text-xs opacity-80">Hello,Manohar</p>
				<p class="font-semibold flex items-center flex items-center space-x-1">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-3 w-3" viewBox="0 0 16 16">
					  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
					</svg>
					<span>Sign in</span>
				</p>
			</div>
				<Link to="wish-list">
					<div>
						<span class="font-bold flex items-center space-x-1 font-bold">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
							<span>WishList</span>
						</span>
					</div>
				</Link>
			<Link to="cart">
				<div class="flex items-center space-x-1">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
						</svg>
					</div>
					<p class="font-semibold leading-none">0</p>
				</div>
			</Link>
		</div>
	</div>
</nav>
