#TODO -  Menambahkan Dynamic assets di destination-hero, event-hero ✔
#FIXME - Memasukkan destination-information_sidebar ke destination-description ✔
#TODO - Mengubah permalink menjadi permalink untuk dinamis (
  <!-- Ini masih belum selesai -->
  #NOTE - destinationpage.astro  
  #NOTE - eventpage.astro 
  #NOTE - Destination_and_event_slider.astro (destination index) 
  #NOTE - Event_index.astro (event index) 
)

#REVIEW - Pertanyaan? 
#SECTION Creating a frontmatter mockup for permalinks[
- Apakah format ini sudah benar?

    title: "Event page"
    description: "Halaman Destinasi"
    permalink: "/Event_page/museum-packages/"
    layout: "default"
]
#SECTION Replace all frontmatter mockup to actual API fetching[
- Apakah kode API Fetching ini sudah benar?
 export const prerender = true; // SSG
 const data = await fetch("https://backenddirectus.madebybagus.xyz", {
   headers: {
     // token directus
     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5YTFiYmQ2LWUwMGQtNGFlNy1hNjM4LTkxMzI3Y2NiMTY1MCIsInJvbGUiOiIxN2VkN2U3Mi0zMmI1LTRlNzQtOThiNS04YTcyNGUwN2Q2ZTgiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTczNzQyNTU4NiwiZXhwIjoxNzM3NDI2NDg2LCJpc3MiOiJkaXJlY3R1cyJ9.bC1WTIqVpXkz5Djwg6V1wlIXYf16yAcLoYzxvFqD3OI",
     // Bypass IDP Cloudflare
     "CF-Access-Client-Id": "afb26c8995066a72ef375fcffb9f1d47.access",
     "CF-Access-Client-Secret":
       "f7f4995a6d1cd59926c34ffda3a1b3014f4eb7cc79855af29b97ba9d53deaf97",
   },
 }).then((res) => res.json());
]

RAPIKAN filenya

Buat cloudflare -> form contact us

membuat getstaticpath ,lalu membuat folder [lang] di src untuk permalink