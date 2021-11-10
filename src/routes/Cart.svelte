<script>
	import * as animateScroll from "svelte-scrollto";
	import { navigate } from "svelte-routing";
	import CartCard from '$lib/CartCard.svelte'
  	import { Link} from "svelte-routing";

	import { user } from '$store/store'
	import { db,provider,auth } from '$store/firebase'
	import { doc, setDoc,collection, addDoc,serverTimestamp,onSnapshot,query, where, getDocs,deleteDoc   } from "firebase/firestore";


    let cartItems = [];
    let subTotal = 0;

	$: if ($user) {
		onSnapshot(collection(db, "users", $user.uid,"cart"), (doc) => {
			cartItems = [];
			doc.forEach((d)=>{	
			    cartItems = [d.data(),...cartItems]	
			})
		});	
	}



	$: subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
	let isAddressModelOpened = false;
	let isCreditModelOpended = false;
	let isSuccessMsgOpened = false;


	const openPaymentModel = () =>{
		isCreditModelOpended = !isCreditModelOpended;
	}

	const clearAll = async () =>{
		const querySnapshot = await getDocs(collection(db, "users", $user.uid,"cart"));
		querySnapshot.forEach(async (docs) => {
		  await deleteDoc(doc(db, "users", $user.uid,"cart", docs.id));
		});
	}

	const doneBuy = async () => {
		animateScroll.scrollToTop();
		isSuccessMsgOpened = !isSuccessMsgOpened;
		const querySnapshot = await getDocs(collection(db, "users", $user.uid,"cart"));
		querySnapshot.forEach(async (docs) => {
		  await deleteDoc(doc(db, "users", $user.uid,"cart", docs.id));
		});
		navigate('/', { replace: true });
	}

</script>


{#if isSuccessMsgOpened}
	<div class="bg-blue-300 text-center py-3">
		Thank your for using our service.....continue shopping👋
	</div>
{/if}
<div class="container mx-auto md:px-10 my-5 md:my-10">
	<div class="md:flex md:flex-row flex-col items-start justify-between space-y-2 md:space-x-10">
		<div class="flex flex-col w-full">
			<h2 class="text-center text-2xl font-semibold mb-4">
				<span class="border-b-2 border-yellow-700 text-[#131921] pb-1 uppercase">cart items</span>
			</h2>
			<button on:click={clearAll} class="{ cartItems.length === 0 ? 'hidden' : ''} hover:text-red-500">Clear all</button>
			{#each cartItems as item, index}
				<div class="my-2 flex items-center space-x-3">
					<p class="md:flex hidden  text-xl text-[#131921] font-semibold">{index+1}.</p>
					<CartCard item={item} />
				</div>
			{:else}
				<div class="flex items-center justify-center my-10 text-lg">
					<p class="font-semibold">Yor Cart is Empty.....<Link class="border-b-2 border-yellow-700 text-yellow-700" to="/">Back to Shopping</Link>
				</div>
			{/each}
		</div>
		<div class="w-full md:max-w-lg">
			<h2 class="text-center text-2xl font-semibold mb-5">
				<span class="border-b-2 border-yellow-700 pb-1">ORDER DETAILS</span>
			</h2>
			<div class=" border border-gray-300 py-2 pb-5">
				<p class="my-5 text-center italic opacity-60 text-sm">Shipping costs are calculated based on product quntites you have entered</p>
				<div class="px-[5rem] flex items-center justify-between my-4">
					<p class="text-2xl font-semibold">Subtotal</p>
					<p class="font-semibold">—</p>
					<p class="text-2xl font-semibold">${Number(subTotal).toFixed(2)}</p>
				</div>
	            <div class="px-[6rem] mt-[2rem]">
	            	<button on:click={() => isAddressModelOpened = !isAddressModelOpened} disabled={cartItems.length === 0 ? true : false} class="disabled:bg-yellow-300 disabled:cursor-not-allowed disabled:shadow-none text-center flex justify-center w-full py-2 mt-6 font-semibold uppercase text-medium shadow hover:shadow-lg rounded bg-[#ffa41c] ">
	            	  <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="md:flex hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
	            	  <span class="ml-2">Procceed to checkout</span>
	            	</button>
	            </div>
			</div>
			{#if isAddressModelOpened}			
				<div class="container mx-auto px-[4rem] my-7 border border-gray-300 py-5">
					<h3 class="font-semibold text-lg">
						<span class="border-b-2 border-yellow-700 pb-1">Address of Your Residence :</span>
					</h3>
					<form on:submit|preventDefault={openPaymentModel} class="w-full flex flex-col items-start space-y-2.5 my-3">
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="name">Name:</label>
							<input required id="name" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="text" placeholder="Enter your name">
						</div>
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="location">Location:</label>
							<input required id="location" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="text" placeholder="Enter your location">
						</div>
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="location">Pincode:</label>
							<input required id="location" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="number" placeholder="Enter your location pincode">
						</div>
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="phone">Phone Number:</label>
							<input required id="phone" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="tel" placeholder="Enter your phone number">
						</div>
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="email">Email:</label>
							<input required id="email" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="email" placeholder="Enter your email number">
						</div>
						<div class="flex items-start justify-center w-full my-3">
							<button class="py-2 px-5 font-semibold bg-[#ffa41c] mt-5">Next...Payment</button>
						</div>
					</form>
				</div>
			{/if}
			{#if isCreditModelOpended}			
				<div class="container mx-auto px-[4rem] my-7 border border-gray-300 py-5">
					<h3 class="font-semibold text-lg">
						<span class="border-b-2 border-yellow-700 pb-1">Credit Card Deatils :</span>
					</h3>
					<form on:submit|preventDefault={doneBuy} class="w-full flex flex-col items-start space-y-2.5 my-3">
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="name">Card Holder Name:</label>
							<input required id="name" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="number" placeholder="Enter Card Holder Name">
						</div>
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="location">Card Number:</label>
							<input required id="location" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="text" placeholder="Enter Card Number">
						</div>
						<div class="w-full flex items-start flex-col space-y-1">
							<label class=" font-semibold text-yellow-800 " for="location">Expiration Date:</label>
							<input required id="location" class="focus:border focus:border-[#ffa41c] focus:ring focus:ring-[#ffa41c] focus:outline-none px-2 py-1.5 w-full border border-gray-900" type="month">
						</div>
						<div class="flex items-start justify-center w-full my-3">
							<button class="py-2 px-5 font-semibold bg-[#ffa41c] mt-5">Buy</button>
						</div>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>