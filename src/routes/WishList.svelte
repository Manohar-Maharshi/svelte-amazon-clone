<script>
	import { Link } from 'svelte-routing'
	import { wishList } from '$store/store'
	import WishCard from '$lib/WishCard.svelte'
</script>



<div class="container mx-auto grid place-items-center my-6 w-full">
	<div>
		<h2 class="text-center text-2xl font-semibold mb-10">
			<span class="border-b-2 border-yellow-700 text-[#131921] pb-1 uppercase">Your Wish-List</span>
		</h2>
		{#each $wishList as item, index}
			<div class="my-4 flex items-center space-x-3">
				<p class="text-xl text-[#131921] font-semibold">{index+1}.</p>
				<WishCard {item}/>
			</div>
		{:else}
			<div class="flex items-center justify-center my-10 text-lg">
				<p class="font-semibold">Yor Wish-list is Empty.....<Link class="border-b-2 border-yellow-700 text-yellow-700" to="/">Back to Shopping</Link>
			</div>
		{/each}
	</div>
</div>