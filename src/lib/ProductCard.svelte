<script>
	import { user } from '$store/store'
	import { navigate } from "svelte-routing";

	import { collection, addDoc,updateDoc,doc,setDoc,getDoc,increment   } from "firebase/firestore"; 
	import { db,provider,auth } from '$store/firebase'


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

	const directBuy = async (productInfo) => {
		if($user){	
			const docSnap = await getDoc(doc(db, "users",$user.uid,"cart",productInfo?.id.toString()));
			if (docSnap.exists()) {
				alert("Alredy in Cart")
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
				navigate('/cart')
			}
		}else{
			alert("Please Login First...then try to add item to cart")
		}
	}
	const addToWishList = async (productInfo) => {
		if ($user) {		
			const docSnap = await getDoc(doc(db, "users",$user.uid,"wish",productInfo?.id.toString()));
			if (docSnap.exists()) {
				alert("Alredy in wish-list")
			} else {
				await setDoc(doc(db, "users",$user.uid,"wish",productInfo.id.toString()), {
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
			alert("Please Login First...then try to add item to wishList")
		}
	}



</script>

<div class="m-1 my-3 mx-4 shadow-lg border border-gray-300 rounded-lg w-[18rem] min-h-[25rem]  max-h-[30rem] flex flex-col items-center p-1 px-2 pt-2 px-3">
	<div>
		<img class="w-full max-w-[16rem] min-h-[11rem] max-h-[7rem] object-cover" src={item?.image} alt={item?.title}>
	</div>
	<div class="my-1 flex-1 w-full	">
		<h2 class="font-semibold leading-tight mt-1 line-clamp-2">{item?.title}</h2>
		<p class="text-2xl font-semibold my-2"><small>$</small>{item?.price}</p>
		<p class="mb-1">
			<span class="text-sm">Rating:</span>
			<span class="text-sm">({Math.round(item?.rating?.rate)})</span>
			{#each Array(Math.round(item?.rating?.rate)).fill() as _, index}
				<span>⭐</span>
			{/each}
			<span class="text-xs italic">({item?.rating?.count})</span>
		</p>
	</div>
	<div class="w-full flex flex-col items-center space-y-1 mt-1 mb-1">
		<div class="flex items-center justify-between space-x-1 w-full text-center text-sm">
			<button  on:click={() => addToWishList({...item,quantity:1})} class="active:transform active:scale-90 text-xs font-bold w-full border bg-[#ffa41c] py-1.5 flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
				</svg>
				<span>Add to Wishlist</span>
			</button>	
			<button on:click={() => addToCart({...item,quantity:1})} class="active:transform active:scale-90 text-xs font-bold w-full border bg-[#ffa41c] py-1.5 flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
				</svg>
				<span>Add to Cart</span>
			</button>	
		</div>
		<button on:click={() => directBuy({...item,quantity:1})} class="active:transform active:scale-90 w-full py-1.5 shadow-lg bg-[#e47911] font-bold">Buy Now</button>
	</div>
</div>