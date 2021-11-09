<script>
	import { cartList } from '$store/store'
	import CartCard from '$lib/CartCard.svelte'
  	import { Link} from "svelte-routing";

	$: subTotal = $cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);

</script>


<div class="container mx-auto px-10 my-10">
	<div class="flex items-start justify-between space-x-10">
		<div class="flex flex-col w-full">
			<h2 class="text-center text-2xl font-semibold mb-4">
				<span class="border-b-2 border-yellow-700 text-[#131921] pb-1 uppercase">cart items</span>
			</h2>
			{#each $cartList as item, index}
				<div class="my-2 flex items-center space-x-3">
					<p class="text-xl text-[#131921] font-semibold">{index+1}.</p>
					<CartCard {item}/>
				</div>
			{:else}
				<div class="flex items-center justify-center my-10 text-lg">
					<p class="font-semibold">Yor Cart is Empty.....<Link class="border-b-2 border-yellow-700 text-yellow-700" to="/">Back to Shopping</Link>
				</div>
			{/each}
		</div>
		<div class="w-full max-w-lg">
			<h2 class="text-center text-2xl font-semibold">
				<span class="border-b-2 border-yellow-700 pb-1">ORDER DETAILS</span>
			</h2>
			<p class="my-5 text-center italic opacity-60 text-sm">Shipping costs are calculated based on product quntites you have entered</p>
			<div class="px-[5rem] flex items-center justify-between my-4">
				<p class="text-2xl font-semibold">Subtotal</p>
				<p class="font-semibold">—</p>
				<p class="text-2xl font-semibold">${Number(subTotal).toFixed(2)}</p>
			</div>
            <div class="px-[6rem] mt-[2rem]">
            	<button disabled={$cartList.length === 0 ? true : false} class="disabled:bg-yellow-300 disabled:cursor-not-allowed disabled:shadow-none flex justify-center w-full py-2 mt-6 font-semibold uppercase text-medium shadow hover:shadow-lg rounded bg-[#ffa41c] ">
            	  <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
            	  <span class="ml-2">Procceed to checkout</span>
            	</button>
            </div>
		</div>
	</div>
</div>