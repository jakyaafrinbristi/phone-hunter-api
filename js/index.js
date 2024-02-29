const loadPhones = async (searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones,isShowAll)

}
const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
    const phonesContainer=document.getElementById("phone-container");
    phonesContainer.textContent='';

    const showAllContainer=document.getElementById('show-all-button');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
 if(!isShowAll){
    phones=phones.slice(0,12)
 }


    phones.forEach(phone => {
        console.log(phone);
        // create a div
        const phonesCard = document.createElement('div');
        phonesCard.classList = `card  bg-base-200 p-4 shadow-xl`;
        phonesCard.innerHTML = `
       <figure><img src="${phone.image}"/></figure>
       <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <p>It should offer a range of advanced features, including a high-resolution camera capable of capturing stunning photos and videos, a powerful processor that ensures smooth performance, and a long-lasting battery that will keep you connected throughout the day.</p>
         <div class="card-actions justify-center">
           <button onclick="handleShowDetail('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">show all</button>
         </div>
       </div>`
       phonesContainer.appendChild(phonesCard)
    });
    toggleLoadingSpinner(false);
}
const handleShowDetail =async (id)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data =await res.json();
    // console.log(data)
    phoneShowDetail(data.data)

}
const phoneShowDetail=(phone)=>{
console.log(phone)
const phoneModalContainer =document.getElementById("phone-modal-container");
phoneModalContainer.innerHTML=`
<img  src="${phone.image}" alt="" >
<p class="font-bold">${phone.name}</p>
<p><span class="font-bold text-center">Storage:</span>${phone?.mainFeatures?.storage}</p>
<p><span class="font-bold">Memory:</span>${phone?.mainFeatures?.memory}</p>
<p><span class="font-bold">Slug:</span>${phone?.slug}</p>


`

}

const handleSearch =(isShowAll)=>{
    // console.log("button")
    const inputSearchField = document.getElementById("input-field");
    toggleLoadingSpinner(true);
    const searchField =inputSearchField.value ;
    console.log(searchField);
    loadPhones(searchField,isShowAll)
}
const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner=document.getElementById("toggle-spinner");
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }

}
const handleShowAll = () => {
    handleSearch(true)

}

// loadPhones();