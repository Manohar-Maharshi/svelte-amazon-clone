<script>
	import { user } from '$store/store'
	import { db,provider,auth } from '$store/firebase'
	import { doc,updateDoc,setDoc,collection, addDoc,increment,onSnapshot,deleteDoc   } from "firebase/firestore";

	export let item;



	const plusItem = async (productItem) => {
		await updateDoc(doc(db, "users",$user.uid,"cart",productItem?.id.toString()), {
		    'quantity' : increment(1),
		});
	}

	const minusItem = async (productItem) => {
		await updateDoc(doc(db, "users",$user.uid,"cart",productItem?.id.toString()), {
		    'quantity' : increment(-1),
		});
	}

	const removeItemFromCart = async (productItem) => {
		await deleteDoc(doc(db, "users",$user.uid,"cart",productItem?.id.toString()));
	}
</script>

<div class="md:max-w-lg md:w-full flex border border-gray-300 shadow rounded md:pl-2 h-[10rem]">
	<img class="md:w-[6rem] w-20 md:mr-5 mr-4 py-2" src={item?.image} alt={item?.title}>
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
				<div class="flex items-center space-x-1 md:space-x-4 border-t border-gray-300">
					<button on:click={() => minusItem(item)} class="bg-[#ffa41c] px-3 md:px-6 py-1 font-semibold text-lg rounded-none">-</button>
					    <p class="text-lg">{item?.quantity}</p>       
					<button on:click={() => plusItem(item)}  class="bg-[#ffa41c] px-3 md:px-6 py-1 font-semibold text-lg rounded-none">+</button>
				</div>
			</div>
		</div>
	</div>
</div>