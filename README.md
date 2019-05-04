# 01-flatland-follies-an-adjunct-simulator
Flatland Follies article


## Running locally

### You need to have the following software installed

- `git`, I believe this should be pre-installed on OSX (run `git --version` on the terminal to see if it is), otherwise install via https://git-scm.com/downloads
- `npm`, install via https://www.npmjs.com/get-npm

Once `npm` is installed, install `idyll` by running `npm install -g idyll`. Note, depending on your system setup you may need to run this command as an administrator; if the previous install command failed, trying installing as admin: `sudo npm install -g idyll`, it will ask you for your password.

### Getting the code from github


To download the project from github, run the following command in the terminal:

```
git clone https://github.com/ParametricPress/01-flatland-follies-an-adjunct-simulator.git
```

Navigate into the new folder by running `cd 01-flatland-follies-an-adjunct-simulator`. Now, if you run `ls` in the terminal it should show a list of the files that corresponds to the ones you've seen on Github.com. 

### Setting up the project

Once you've navigated into the project run `npm install` to get any local dependencies. Then you're ready to launch the project using Idyll. 

### Running the idyll server

To start, run `idyll --template _local.html` in the terminal, and the project should open in your browser.

You can edit the `index.idyll` file in the text editor of your choice, and the page will refresh in the browser as you make updates.
