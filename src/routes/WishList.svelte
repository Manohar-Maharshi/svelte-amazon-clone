<script>
	import { Link } from 'svelte-routing'
	import WishCard from '$lib/WishCard.svelte'

	import { user } from '$store/store'
	import { db,provider,auth } from '$store/firebase'
	import { doc, setDoc,collection, addDoc,serverTimestamp,onSnapshot,query, where, getDocs,deleteDoc   } from "firebase/firestore";

    let wishItems = [];

	$: if ($user) {
		onSnapshot(collection(db, "users", $user.uid,"wish"), (doc) => {
			wishItems = [];
			doc.forEach((d)=>{	
			    wishItems = [d.data(),...wishItems]	
			})
		});	
	}


</script>



<div class="container mx-auto grid place-items-center my-6 w-full">
	<div>
		<h2 class="text-center text-2xl font-semibold mb-10">
			<span class="border-b-2 border-yellow-700 text-[#131921] pb-1 uppercase">Your Wish-List</span>
		</h2>
		{#each wishItems as item, index}
			<div class="my-4 flex items-center space-x-3">
				<p class="md:flex hidden text-xl text-[#131921] font-semibold">{index+1}.</p>
				<WishCard {item}/>
			</div>
		{:else}
			<div class="flex items-center justify-center my-10 text-lg">
				<p class="font-semibold">Yor Wish-list is Empty.....<Link class="border-b-2 border-yellow-700 text-yellow-700" to="/">Back to Shopping</Link>
			</div>
		{/each}
	</div>
</div>