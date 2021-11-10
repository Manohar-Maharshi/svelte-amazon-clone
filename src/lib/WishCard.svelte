<script>
	import { user } from '$store/store'
	import { db,provider,auth } from '$store/firebase'
	import { doc, setDoc,collection,updateDoc,increment,addDoc,serverTimestamp,onSnapshot,query, where,getDoc ,getDocs,deleteDoc   } from "firebase/firestore";

	export let item;

	const addToCart = async (productInfo) => {
		if($user){	
			const docSnap = await getDoc(doc(db, "users",$user.uid,"cart",productInfo?.id.toString()));
			if (docSnap.exists()) {
				const hel = await updateDoc(doc(db, "users",$user.uid,"cart",docSnap.data().id.toString()), {
				    'quantity' : increment(1),
				});

			} else {
				await setDoc(doc(db, "users",$user.uid,"cart",productInfo.id.toString()), {
					title : productInfo?.title,
					quantity : productInfo?.quantity,
					price : productInfo?.price,
					image : productInfo?.image,
					id : productInfo?.id,
					rating : {
						count : productInfo?.rating?.count,
						rate : productInfo?.rating?.rate,
					},
				});
			}
		}else{
			alert("Please Login First...then try to add item to cart")
		}
	}

	const removeItemFromWishList = async (productItem) => {
		await deleteDoc(doc(db, "users",$user.uid,"wish",productItem?.id.toString()));
	}
</script>

<div class="max-w-lg w-full flex justify-center border border-gray-300 shadow rounded pl-2 h-[10rem]">
	<img class="md:w-[6rem] w-20 mr-5 py-2" src={item?.image} alt={item?.title}>
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
				<div class="flex items-center space-x-4 border-t border-gray-300">
					<button on:click={() => removeItemFromWishList(item)} class="bg-[#ffa41c] md:px-6 px-2 py-1  rounded-none md:text-base text-sm">Remove</button>
					<button on:click={() => addToCart(item)}  class="bg-[#ffa41c] md:px-6 px-2 py-1  rounded-none">
						<span class="md:flex hidden">Add To Cart</span>
						<span class="text-sm flex md:hidden ">➕ Cart</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>