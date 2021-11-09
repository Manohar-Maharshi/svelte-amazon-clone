<script>
	import { cartList } from '$store/store'

	export let item;

	const plusItem = (productItem) => {
		for(let item of $cartList) {
			if(item.id === productItem.id) {
				productItem.quantity++;
				$cartList = $cartList;
				return;
			}
		}
	}

	const minusItem = (productItem) => {
		for(let item of $cartList) {
			if(item.id === productItem.id) {
				if (productItem.quantity <= 1) return
				productItem.quantity--;
				$cartList = $cartList;
				return;
			}
		}
	}

	const removeItemFromCart = (productItem) => {
		$cartList = $cartList.filter((cartItem) => cartItem.id != productItem.id);
	}
</script>

<div class="max-w-lg w-full flex border border-gray-300 shadow rounded pl-2 h-[10rem]">
	<img class="w-[6rem] mr-5 py-2" src={item?.image} alt={item?.title}>
	<div class="flex flex-col">
		<div class="flex flex-col items-start h-full pt-2">
			<h1 class="font-semibold text-[#131921] line-clamp-1 text-lg">{item?.title}</h1>
			<p class="my-1">
				<span class="text-sm">Rating:</span>
				<span class="text-sm">({Math.round(item?.rating?.rate)})</span>
				{#each Array(Math.round(item?.rating?.rate)).fill() as _, index}
					<span>⭐</span>
				{/each}
				<span class="text-xs italic">({Math.round(item?.rating?.count)})</span>
			</p>
		</div>
		<div class="flex items-center w-full space-x-4 justify-between">
			<h3 class="font-semibold text-xl">${item?.price}</h3>
			<div class="flex items-end space-x-1">
				<p on:click={() => removeItemFromCart(item)} class="cursor-pointer text-xs text-red-700 italic">(Remove)</p>
				<div class="flex items-center space-x-4 border-t border-gray-300">
					<button on:click={() => minusItem(item)} class="bg-[#ffa41c] px-6 py-1 font-semibold text-lg rounded-none">-</button>
					    <p class="text-lg">{item?.quantity}</p>       
					<button on:click={() => plusItem(item)}  class="bg-[#ffa41c] px-6 py-1 font-semibold text-lg rounded-none">+</button>
				</div>
			</div>
		</div>
	</div>
</div>