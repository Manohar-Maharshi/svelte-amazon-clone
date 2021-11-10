<script>
	import  ProductCard from '$lib/ProductCard.svelte';
	import  Spinner from '$lib/Spinner.svelte';


	const fetchCategories = async () => {
		const res = await fetch("https://fakestoreapi.com/products/categories");
		return (await res.json());
	}

	const fetchProductsByCategory = async (item) => {
		const res = await fetch(`https://fakestoreapi.com/products/category/${item}`);
		return (await res.json());
	}



</script>

{#await fetchCategories()}
	<Spinner />
{:then result}
		{#each result as item, index}
			{#await fetchProductsByCategory(item)}
				loading...
			{:then result}
				<div class="container mx-auto my-10 mt-5">
					<p class="font-semibold border-b-2 border-yellow-700 inline-block capitalize text-2xl py-1">{item}</p>
					<div class="flex items-start md:justify-start justify-center flex-wrap">	
						{#each result as item (item.id)}
							<ProductCard {item} />
						{/each}
					</div>
				</div>
			{/await}
		{/each}
{:catch error}
	<pre>error</pre>
{/await}