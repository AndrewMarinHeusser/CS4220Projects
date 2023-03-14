# CS4220Projects
API project for CS4220

Boys here is how you set up the repositroy 
In your file directory go to where you want the project to be stored and open git there then do the following commands (note make sure you have git installed if you do not download here: https://git-scm.com/downloads):

git clone git@github.com:AndrewMarinHeusser/CS4220Projects.git

If this command does not work it means your ssh key has not been set up
follow the steps provided in the following two links
do this one first to create your SSH key locally
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

then do this one to add the newly created ssh key to you github account. Keep in mind each different device you are planning on working from need its OWN ssh key. so if your planning on working from multiple devices you will need multiple keys. (also dont forget the password you make for the key or else we are in a lot of trouble)
 https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

 after insuring the SSH works preform the clone command from earlier and then preform the following commands below:

git status
git add .
git commit -m "Insert Message Here"

(Message should be something like "First commit from Andrew Heusser)

thatll get the repositroy downloaded onto your computer and preform your first commit pushing it up to github

then do these commands:

git branch dev1
git checkout dev1
git push origin dev1
git pull origin dev1

This will create the dev branch which is where we'll be preformin all edits on
The main branch will be purly just for storing the latestly working copy
Ill be incharge of merging things from dev1 to main, just tell me when the portion your working on is completed and Ill get started on merging the branches.


Understanding the commands:
git add . adds all changes made to your pending local git system
git commit then actually adds it to your local git system along with a message explaining what youve done.
git push takes all the commits you have created and sends it to github allowing the rest of us to access it and storing it in a secure cloud
git pull takes the existing items on github and puts it on your computer making sure your local files are up to date

ALWAYS START BY PREFORMING A PULL COMMAND
This will prevent code conflicts and allow us to all work together smoothly.