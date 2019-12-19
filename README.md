# Source code for PPNW's website

## Installation
1. Install GIT LFS from https://git-lfs.github.com
1. Install jekyllrb following the instructions on https://jekyllrb.com/docs/installation/macos/
2. Install npm
3. Type `npm install` or `yarn install` to install the dependencies 
1. Type `gulp` to build the website
4. The website is built in the 'ppnw-website' folder

## Add new members of the committee
Edit the file in `src/_data/committee.yml` following the YAML syntax. Supported files are:

 - name: the member's name
 - title: the member's title
 - email: the member's email address
 - where: the member's location
 
## Add new conferences in the homepage's timeline
Edit the file in `src/_data/past-conferences.yml` following the YAML syntax. Supported files are:

 - name: the member's name
 - title: the member's title
 - email: the member's email address
 - where: the member's location

- year: the year when the conference was or will be held
- where: the country and city
- next: set to true to mark the block as the next conference
- image: this field contains the following nested fields:
    - fileName: name of the image file in the `src/assets/img` folder
    - credits: Credits to the image
- urls: this field is used to generated multiple URLS; each nested field can contain the following fields:
    - href: the URL of the link (for proceedings, extended abstracts or conference website)
    - title: the URL title
    - iconClass: the icon class. See https://fontawesome.com/icons
