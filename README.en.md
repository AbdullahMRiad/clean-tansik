# College Admission Results for the Equivalency of the Saudi Arabian Certificate (Boys - Science) 2024

A simple and fast website to view the Egyptian university admission results for the Saudi high school science track certificate in 2024, separated by boys and girls. It supports quick search and filtering by school grade and Qudurat score.

🔗 **Live site:** [tansik.vercel.app](https://tansik.vercel.app)

---

## 📌 What does the site offer?

* Displays admission data separately for boys and girls
* Instant search across all faculties
* Ability to filter results based on school grade and Qudurat score
* Simple and responsive design for all devices

---

## 📱 How to use

1. Open the site: [tansik.vercel.app](https://tansik.vercel.app)
2. Choose either "boys" or "girls" from the top
3. Use the search bar to find the faculty you want  
   - You can also filter faculties by your school grade and Qudurat score (enter a value between 0 and 100)

---

## 🛠️ How was the site made?

* Boys' data was extracted from:  
  [https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648773](https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648773)
* Girls' data from:  
  [https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648786](https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648786)
* The text was processed using [RegExr](https://regexr.com) with the pattern:  
  `/([^\n]+?)\s+(\d+\.\d{6})/g`
* Matches were exported as JSON
* The data was cleaned using a Python script into `b_clean_data.json` and `g_clean_data.json`
* The website’s structure and code were then automatically generated using the DeepSeek model

---

## 💡 Have a suggestion?

You can:

* Open an [Issue on GitHub](https://github.com/AbdullahMRiad/clean-tansik/issues/new)
* Or contact me on Telegram: [@AbdullahMRiad](https://t.me/AbdullahMRiad)

---

## 🧠 Additional Notes

* The code is open source and contributions via Pull Requests are welcome
* You can run the site locally by opening `index.html` in your browser after downloading the project:  
  `git clone https://github.com/AbdullahMRiad/clean-tansik`
