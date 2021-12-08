import requests

sponsors = ["https://jetsbasket.no/wp-content/uploads/2021/06/NTE-hovedlogo-pdf-2-1024x552.png",
            "https://jetsbasket.no/wp-content/uploads/2021/10/WCDI-logo-sort-1024x759.png",
            "https://jetsbasket.no/wp-content/uploads/2021/08/Nidaros_Sparebank_logo_positiv_liggende-1024x289.png",
            "https://jetsbasket.no/wp-content/uploads/2021/03/norbit_explore_more-2-1024x561.png",
            "https://jetsbasket.no/wp-content/uploads/2021/03/cocacola_logo_PNG14-1024x322.png",
            "https://jetsbasket.no/wp-content/uploads/2021/08/HUFS-web.png",
            "https://jetsbasket.no/wp-content/uploads/2021/10/Multi_Renhold_Logo_text-1024x428.jpg",
            "https://jetsbasket.no/wp-content/uploads/2021/08/soulsport.png", ]

names = ["nte", "we_can_do_it", "nidaros_sparebank",
         "norbit", "cola", "hufs", "multi_renhold", "soul_sport"]

for url, name in zip(sponsors, names):
    with open(name + ".png", "wb") as f:
        f.write(requests.get(url).content)
