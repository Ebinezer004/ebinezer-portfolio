# Ebinezer M Portfolio

A static portfolio for AI engineering roles and freelance work. It includes Placify and PredictPay case studies, an interactive explanation of the Placify pipeline, an expandable career history, skills, education, certifications, and both source PDFs.

## Preview locally

Extract the ZIP and enter the `ebinezer-portfolio` folder. From that folder, start a local server.

```sh
python3 -m http.server 3000 --bind 127.0.0.1 --directory public
```

On Windows, use `py -3` in place of `python3`. Open [http://localhost:3000](http://localhost:3000). Stop the local server with Ctrl+C.

The site uses HTML, CSS, and browser JavaScript. It has no build step, Node packages, environment variables, or backend. Contact buttons open the visitor’s email app with a subject or project brief prefilled.

## Commit and push to GitHub

1. Sign in to GitHub and create a new empty repository called `ebinezer-portfolio`. Leave the README, license, and gitignore options unchecked. You can choose a private repository and grant Vercel access to it.
2. From the extracted `ebinezer-portfolio` folder, run the following. Replace `YOUR_GITHUB_USERNAME` with the username of the account where you created the repository.

```sh
git init
git add .
git commit -m "Add AI engineering portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ebinezer-portfolio.git
git push -u origin main
```

The file tree on GitHub should show `vercel.json` beside `public/` at the repository root. With GitHub Desktop, you can add the extracted folder as a local repository, commit the files, and publish the repository from the app.

## Deploy to Vercel

1. Sign in to Vercel and select **Add New… → Project**.
2. Connect GitHub if prompted, then import the `ebinezer-portfolio` repository.
3. Keep **Root Directory** at the repository root and choose **Other** for the framework preset if prompted. The included `vercel.json` sets the output directory to `public`. If the form requires you to set it, enter `public`. Leave **Build Command** and **Install Command** unset.
4. Select **Deploy**. Open the assigned `vercel.app` URL and check the mobile menu, the four Placify diagram buttons, the case notes, and the PDF links.
5. Push later changes to `main` to update the production site through Vercel’s Git integration.

## Edit the portfolio

| Change | File |
| --- | --- |
| Text, dates, contact info, links, and page metadata | `public/index.html` |
| Colors, spacing, typography, and responsive layout | `public/assets/styles.css` |
| System map, mobile navigation, and deep links to case notes | `public/assets/site.js` |
| Résumé and LinkedIn profile export | `public/documents/` |

The site includes the email address, phone number, and downloadable PDFs supplied for the portfolio. Review those fields and PDFs before making the site public. Deep learning appears as a career interest. The case studies cover the work documented in the supplied files.

The PredictPay URL may open a Streamlit sign-in page. The project’s GitHub source is linked next to it.

### Add your original portrait

Save the original image as `public/assets/portrait.jpg`. In `public/index.html`, replace the optional portrait comment in **About me** with the following. Update the width and height if you use a different photo size.

```html
<img class="about-portrait" src="assets/portrait.jpg"
     alt="Portrait of Ebinezer M" width="1254" height="1254" loading="lazy">
```

## Project layout

```text
ebinezer-portfolio/
├── .gitignore
├── README.md
├── vercel.json
└── public/
    ├── index.html
    ├── assets/
    │   ├── favicon.png
    │   ├── fonts/
    │   ├── site.js
    │   └── styles.css
    └── documents/
        ├── ebinezer-profile.pdf
        └── ebinezer-resume.pdf
```

DM Sans, Space Grotesk, and IBM Plex Mono are served locally. Their SIL Open Font License files are in `public/assets/fonts/`.
